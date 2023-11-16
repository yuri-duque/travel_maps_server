import { IBaseEntity } from "./baseEntity";

export interface IUserToken extends IBaseEntity {
  userId: string;
  refreshToken: string;
  createdAt?: Date;
}
