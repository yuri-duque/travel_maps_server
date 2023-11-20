import mongoose from "mongoose";

import { Marker } from "../entities/marker";
import CustomError from "../utils/customError";
import { MarkerModel } from "./db/models/markerModel";

export interface filterProps {
  user_id: string;
  place_types?: string[];
  country?: string;
  city?: string;
}

export default class MarkerRepository {
  _model!: mongoose.Model<Marker>;
  defaultProjection = { _id: 0, createdAt: 0, updatedAt: 0, user_id: 0 };

  async _initModel() {
    const markerModel = new MarkerModel();
    this._model = await markerModel.create();
  }

  async getById(place_id: string, user_id: string): Promise<Marker | undefined> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.findOne({ place_id, user_id });

      return result?.toObject<Marker>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to get marker by id");
    }
  }

  async filter({ user_id, place_types, country, city }: filterProps): Promise<Marker[]> {
    try {
      if (!this._model) await this._initModel();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = { user_id };

      if (place_types) {
        query.place_types = { $in: place_types };
      }
      if (country) {
        query.country = country;
      }
      if (city) {
        query.city = city;
      }

      const results = await this._model.find(query, this.defaultProjection).sort({ name: "asc" });

      return results.map((result) => {
        return result.toObject<Marker>();
      });
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to filter markers");
    }
  }

  async create(marker: Marker): Promise<Marker> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.create(marker);

      return result.toObject<Marker>();
    } catch (error) {
      throw new CustomError("Error to create marker");
    }
  }

  async update(place_id: string, user_id: string, marker: Marker): Promise<void> {
    try {
      if (!this._model) await this._initModel();

      await this._model.updateOne({ place_id, user_id }, marker);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to update marker");
    }
  }

  async delete(place_id: string, user_id: string): Promise<void> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.deleteOne({ place_id, user_id });
      if (result.deletedCount === 0) {
        throw new CustomError("Error to delete marker");
      }
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to delete marker");
    }
  }
}
