import { Role } from "../enum";
import { IBaseEntity } from "./baseEntity";

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
  name: string;
  roles: Role[];
}
