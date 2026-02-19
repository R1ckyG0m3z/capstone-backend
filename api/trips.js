import express from "express";
const tripsRouter = express.Router();

import { getTripById, getTrips } from "#db/queries/trips";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const geocodeCache = new Map();

const geocodeLocation = async (location) => {
  if (!MAPBOX_TOKEN) {
    throw new Error("Mapbox token not configured.");
  }

  const cacheKey = location.toLowerCase();
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  const query = encodeURIComponent(location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}&limit=1&country=us&types=region&autocomplete=false`;
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Mapbox geocoding failed (${response.status}): ${body || "No details"}`,
    );
  }

  const data = await response.json();
  const coords = data.features?.[0]?.center || null;
  geocodeCache.set(cacheKey, coords);
  return coords;
};

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

tripsRouter.get("/geocode", async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).send({ error: "Location is required." });
  }

  try {
    const center = await geocodeLocation(location);
    if (!center) {
      return res.status(404).send({ error: "Location not found." });
    }
    res.send({ location, center });
  } catch (error) {
    console.error("Error geocoding location:", error.message);
    res
      .status(500)
      .send({ error: "Failed to geocode location", details: error.message });
  }
});

tripsRouter.param("id", async (req, res, next, id) => {
  if (!/^[0-9]+$/.test(id)) {
    return res.status(400).send("Invalid trip id");
  }
  const trip = await getTripById(id);
  if (!trip) return res.status(404).send("Trip not found");
  req.trip = trip;
  next();
});

tripsRouter.get("/:id", (req, res) => {
  res.send(req.trip);
});

export { tripsRouter };
