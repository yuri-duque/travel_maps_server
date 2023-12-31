import jwt from "jsonwebtoken";

import { User } from "../entities/user";
import { Role } from "../enum";

export function generateToken(user: User) {
  const payload = handlePayload(user);

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}

export function generateRefreshToken(user: User) {
  const payload = handlePayload(user);

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "365d" });
}

export function verifyToken(token: string): DecodedToken {
  return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
}

function handlePayload(user: User) {
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
