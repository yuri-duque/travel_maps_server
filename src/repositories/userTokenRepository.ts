import mongoose from "mongoose";

import { UserToken } from "../entities/userToken";
import CustomError from "../utils/customError";
import { UserTokenModel } from "./db/models/userTokenModel";

export default class UserTokenRepository {
  _model!: mongoose.Model<UserToken>;

  async _initModel() {
    const userTokenModel = new UserTokenModel();
    this._model = await userTokenModel.create();
  }

  async create(UserToken: UserToken): Promise<UserToken> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.create(UserToken);

      return result.toObject<UserToken>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to create userToken");
    }
  }

  async findOne(user_id: string): Promise<UserToken | null> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.findOne({ user_id });

      if (!result) return null;

      return result.toObject<UserToken>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to find one userToken");
    }
  }

  async remove(user_id: string): Promise<void> {
    try {
      if (!this._model) await this._initModel();

      await this._model.deleteOne({ user_id });
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to remove userToken");
    }
  }
}
