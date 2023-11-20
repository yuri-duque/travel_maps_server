import mongoose, { Schema } from "mongoose";

import { UserToken } from "../../../entities/userToken";
import { BaseModel } from "./baseModel";

const userSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, autoIndex: true },
);

export class UserTokenModel extends BaseModel<UserToken> {
  async create(): Promise<mongoose.Model<UserToken>> {
    return super.create("UserTokens", userSchema);
  }
}
