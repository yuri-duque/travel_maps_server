import mongoose from "mongoose";

import { IUserToken } from "../entities/userToken";
import CustomError from "../utils/customError";
import { UserTokenModel } from "./db/models/userTokenModel";

export default class UserTokenRepository {
  _model!: mongoose.Model<IUserToken>;

  async _initModel() {
    const userTokenModel = new UserTokenModel();
    this._model = await userTokenModel.create();
  }

  async create(IUserToken: IUserToken): Promise<IUserToken> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.create(IUserToken);

      return result.toObject<IUserToken>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to create userToken");
    }
  }

  async findOne(userId: string): Promise<IUserToken | null> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.findOne({ userId });

      if (!result) return null;

      return result.toObject<IUserToken>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to find one userToken");
    }
  }

  async remove(userId: string): Promise<void> {
    try {
      if (!this._model) await this._initModel();

      await this._model.deleteOne({ userId });
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to remove userToken");
    }
  }
}
