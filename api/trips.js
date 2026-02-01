import express from "express";
const tripsRouter = express.Router();

import { getTripById, getTrips } from "#db/queries/trips";
import requireUser from "#middleware/requireUser";

tripsRouter.get("/", async (req, res) => {
  const trips = await getTrips();
  res.send(trips);
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

tripsRouter.get("/user/:userId", requireUser, async (req, res) => {
  const trips = await getTripsByUserId(req.params.userId);
  res.send(trips);
});

export { tripsRouter };
