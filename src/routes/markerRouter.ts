import { Request, Response, Router } from "express";

import { Marker } from "../entities/marker";
import { authUser } from "../middlewares/authMiddleware";
import { filterProps } from "../repositories/markerRepository";
import MarkerService from "../services/markerService";
import { getUserIdFromToken } from "../utils/getUserFromToken";

const router = Router();
const markerService = new MarkerService();

router.get("/marker/filter", authUser, async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Marker']

    const { place_types, country, city } = req.query;
    const user_id = getUserIdFromToken(req);

    const props: filterProps = {
      user_id,
      place_types: place_types ? (place_types as string).split(",") : undefined,
      country: country as string | undefined,
      city: city as string | undefined,
    };

    const markers = await markerService.filter(props);

    res.success({ message: "Marker filtered successfully", data: markers });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to create maker" });
  }
});

router.post("/marker", authUser, async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Marker']

    const { place_id, description, place_types, country, city, location, icon, color } = req.body;
    const user_id = getUserIdFromToken(req);

    const newMarker: Marker = {
      place_id,
      description,
      place_types,
      country,
      city,
      location,
      icon,
      color,
      user_id,
    };

    await markerService.create(newMarker);

    res.success({ message: "Marker created successfully" });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to create maker" });
  }
});

router.put("/marker", authUser, async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Marker']

    const { place_id, description, place_types, country, city, location, icon, color } = req.body;
    const user_id = getUserIdFromToken(req);

    const newMarker: Marker = {
      place_id,
      description,
      place_types,
      country,
      city,
      location,
      icon,
      color,
      user_id,
    };

    await markerService.update(newMarker.place_id as string, user_id, newMarker);

    res.success({ message: "Marker updated successfully" });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to update maker" });
  }
});

router.delete("/marker", authUser, async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Marker']

    const { place_id } = req.query;
    const user_id = getUserIdFromToken(req);

    await markerService.delete(place_id as string, user_id);

    res.success({ message: "Marker deleted successfully" });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to delete maker" });
  }
});

export default router;
