import mongoose, { Schema } from "mongoose";

import { IUserToken } from "../../../entities/userToken";
import { BaseModel } from "./baseModel";

const userSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, autoIndex: true },
);

export class UserTokenModel extends BaseModel<IUserToken> {
  async create(): Promise<mongoose.Model<IUserToken>> {
    return super.create("UserTokens", userSchema);
  }
}
