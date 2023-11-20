import { compare } from "bcrypt";

import { User } from "../entities/user";
import { UserToken } from "../entities/userToken";
import UserRepository from "../repositories/userRepository";
import UserTokenRepository from "../repositories/userTokenRepository";
import CustomError from "../utils/customError";
import { DecodedToken, generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";

type LoginProps = {
  email: string;
  password: string;
};

type RefreshTokenProps = {
  refreshToken: string;
};

export default class AuthService {
  userRepository!: UserRepository;
  userTokenRepository!: UserTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokenRepository();
  }

  async login({ email, password }: LoginProps) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new CustomError("Email ou Senha inválido");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new CustomError("Email ou Senha inválido");

    const token = await generateToken(user);
    const refreshToken = await generateRefreshToken(user);

    await this._updateRefreshToken(user, refreshToken);

    return { token, refreshToken };
  }

  async refreshToken({ refreshToken }: RefreshTokenProps) {
    let decoded: DecodedToken | undefined;
    try {
      decoded = await verifyToken(refreshToken);
    } catch {
      throw new CustomError("Não autorizado", 401);
    }

    const userToken = await this.userTokenRepository.findOne(decoded._id as string);

    if (!userToken) throw new CustomError("Refresh token inválido");

    const user = await this.userRepository.getById(userToken.user_id);

    if (!user) throw new CustomError("Refresh token inválido");

    await this._updateRefreshToken(user, refreshToken);

    const token = await generateToken(user);

    return { token };
  }

  async _updateRefreshToken(user: User, refreshToken: string) {
    const existToken = await this.userTokenRepository.findOne(user._id as string);

    if (existToken) {
      await this.userTokenRepository.remove(user._id as string);
    }

    const userToken: UserToken = { user_id: user._id as string, refreshToken };

    await this.userTokenRepository.create(userToken);
  }
}
