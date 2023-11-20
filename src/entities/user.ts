import { Role } from "../enum";
import { BaseEntity } from "./baseEntity";

export interface User extends BaseEntity {
  email: string;
  password: string;
  name: string;
  roles: Role[];
}
