import jwt from "jsonwebtoken";

import { IUser } from "../entities/user";
import { Role } from "../enum";

export async function generateToken(user: IUser) {
  const payload = handlePayload(user);

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}

export async function generateRefreshToken(user: IUser) {
  const payload = handlePayload(user);

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "365d" });
}

export async function verifyToken(token: string): Promise<DecodedToken> {
  return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
}

function handlePayload(user: IUser) {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    roles: user.roles,
  } as DecodedToken;
}

export type DecodedToken = {
  _id: string;
  email: string;
  name: string;
  roles: Role[];
};
