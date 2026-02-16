import express from "express";
const tripsRouter = express.Router();

import { getTripById, getTrips } from "#db/queries/trips";

tripsRouter.get("/", async (req, res) => {
  try {
    const trips = await getTrips();
    res.send(trips);
  } catch (error) {
    console.error("Error fetching trips:", error.message);
    res
      .status(500)
      .send({ error: "Failed to fetch trips", details: error.message });
  }
});

tripsRouter.param("id", async (req, res, next, id) => {
  const trip = await getTripById(id);
  if (!trip) return res.status(404).send("Trip not found");
  req.trip = trip;
  next();
});

tripsRouter.get("/:id", (req, res) => {
  res.send(req.trip);
});

export { tripsRouter };
