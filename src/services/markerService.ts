import { Marker } from "../entities/marker";
import MarkerRepository, { filterProps } from "../repositories/markerRepository";
import CustomError from "../utils/customError";

export interface CreateMarkerProps {}

export default class MarkerService {
  markerRepository!: MarkerRepository;

  constructor() {
    this.markerRepository = new MarkerRepository();
  }

  async filter(filterProps: filterProps): Promise<Marker[]> {
    const markers = await this.markerRepository.filter(filterProps);

    return markers;
  }

  async create(newMarker: Marker): Promise<Marker> {
    this.markerValidation(newMarker);

    const markerExists = await this.markerRepository.getById(
      newMarker._id as string,
      newMarker.user_id,
    );
    if (markerExists) throw new CustomError("Marker already exists");

    return this.markerRepository.create(newMarker);
  }

  async update(id: string, user_id: string, newMarker: Marker): Promise<void> {
    this.markerValidation(newMarker);

    const markerExists = await this.markerRepository.getById(id, user_id);
    if (!markerExists) throw new CustomError("Marker does not exist");

    this.markerRepository.update(id, user_id, newMarker);
  }

  async delete(id: string, user_id: string): Promise<void> {
    const markerExists = await this.markerRepository.getById(id, user_id);
    if (!markerExists) throw new CustomError("Marker does not exist");

    this.markerRepository.delete(id, user_id);
  }

  markerValidation(newMarker: Marker) {
    if (!newMarker.place_id || !newMarker.place_id.trim())
      throw new CustomError("place_id is required");

    if (!newMarker.description || !newMarker.description.trim())
      throw new CustomError("description is required");

    if (!newMarker.user_id || !newMarker.user_id.trim())
      throw new CustomError("user_id is required");
  }
}
