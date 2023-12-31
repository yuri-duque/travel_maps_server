import mongoose, { Schema } from "mongoose";

import { User } from "../../../entities/user";
import { Role } from "../../../enum";
import { BaseModel } from "./baseModel";

const userSchema: Schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Role), default: [Role.user] },
  },
  { versionKey: false, autoIndex: true },
);

export class UserModel extends BaseModel<User> {
  async create(): Promise<mongoose.Model<User>> {
    return super.create("Users", userSchema);
  }
}
