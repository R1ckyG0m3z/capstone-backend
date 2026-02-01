import db from "#db/client";

// Get trips by user profile ID
export async function getTripsByUserProfileId(userProfileId) {
  const sql = `
    SELECT trips.*
    FROM trips
    JOIN user_trips ON trips.id = user_trips.trip_id
    WHERE user_trips.user_profile_id = $1
  `;
  const { rows: trips } = await db.query(sql, [userProfileId]);
  return trips;
}
// Assign a trip to a user profile
export async function assignTripToUserProfile(userProfileId, tripId) {
  const sql = `
    INSERT INTO user_trips (user_profile_id, trip_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [userTrip],
  } = await db.query(sql, [userProfileId, tripId]);
  return userTrip;
}
// Remove a trip from a user profile
export async function removeTripFromUserProfile(userProfileId, tripId) {
  const sql = `
    DELETE FROM user_trips
    WHERE user_profile_id = $1 AND trip_id = $2
    RETURNING *
    `;
  const {
    rows: [userTrip],
  } = await db.query(sql, [userProfileId, tripId]);
  return userTrip;
}
// Create a new user profile
export async function createUserProfile(userId, profileData = {}) {
  const { bio, name, about_me, vehicle_type, photo_url } = profileData;
  const sql = `
    INSERT INTO user_profiles (user_id, bio, name, about_me, vehicle_type, photo_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
  const {
    rows: [userProfile],
  } = await db.query(sql, [
    userId,
    bio,
    name,
    about_me,
    vehicle_type,
    photo_url,
  ]);
  return userProfile;
}
// Get a user profile by user ID
export async function getUserProfileByUserId(userId) {
  const sql = `
    SELECT *
    FROM user_profiles
    WHERE user_id = $1
    `;
  const {
    rows: [userProfile],
  } = await db.query(sql, [userId]);
  return userProfile;
}
// Update a user profile
export async function updateUserProfile(userId, profileData) {
  // Convert empty strings to null, keep actual values
  const bio = profileData.bio || null;
  const name = profileData.name || null;
  const about_me = profileData.about_me || null;
  const vehicle_type = profileData.vehicle_type || null;
  const photo_url = profileData.photo_url || null;

  const sql = `
    UPDATE user_profiles
    SET bio = $1,
        name = $2,
        about_me = $3,
        vehicle_type = $4,
        photo_url = $5,
        updated_at = NOW()
    WHERE user_id = $6
    RETURNING *
    `;
  const {
    rows: [userProfile],
  } = await db.query(sql, [
    bio,
    name,
    about_me,
    vehicle_type,
    photo_url,
    userId,
  ]);
  return userProfile;
}
