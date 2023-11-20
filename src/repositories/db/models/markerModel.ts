import mongoose, { Schema } from "mongoose";

import { Marker } from "../../../entities/marker";
import { BaseModel } from "./baseModel";

const markerSchema: Schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },

    place_id: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    place_types: { type: [String], required: true },
    country: { type: String },
    city: { type: String },
    location: {
      type: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    icon: { type: String },
    color: { type: String },

    user_id: { type: String, required: true, index: true },
  },
  { versionKey: false, autoIndex: true },
);

export class MarkerModel extends BaseModel<Marker> {
  async create(): Promise<mongoose.Model<Marker>> {
    return super.create("Markers", markerSchema);
  }
}
