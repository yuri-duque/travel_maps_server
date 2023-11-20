import { BaseEntity } from "./baseEntity";

export interface Marker extends BaseEntity {
  place_id: string;
  description: string;
  place_types?: string[];
  country?: string;
  city?: string;
  location: Location;
  icon?: string;
  color?: string;

  user_id: string;
}
