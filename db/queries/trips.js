import db from "#db/client";

// Get all trips
export async function getTrips() {
  const sql = "SELECT * FROM trips";
  const { rows: trips } = await db.query(sql);
  return trips;
}

// Get a trip by its ID
export async function getTripById(id) {
  const sql = "SELECT * FROM trips WHERE id = $1";
  const {
    rows: [trip],
  } = await db.query(sql, [id]);
  return trip;
}

// Create a new trip
export async function createTrip(
  trip_name,
  trip_location,
  trip_difficulty,
  trip_description,
  terrain_type,
  trail_length = null,
  estimated_time = null,
  photo_urls = null,
) {
  const sql = `
    INSERT INTO trips (trip_name, trip_location, trip_difficulty, trip_description, terrain_type, trail_length, estimated_time, photo_urls)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const {
    rows: [trip],
  } = await db.query(sql, [
    trip_name,
    trip_location,
    trip_difficulty,
    trip_description,
    terrain_type,
    trail_length,
    estimated_time,
    photo_urls,
  ]);
  return trip;
}
