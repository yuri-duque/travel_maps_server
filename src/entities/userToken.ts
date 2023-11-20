import { BaseEntity } from "./baseEntity";

export interface UserToken extends BaseEntity {
  user_id: string;
  refreshToken: string;
  createdAt?: Date;
}
