import express from "express";
const user_profileRouter = express.Router();

import { getTripsByUserProfileId } from "#db/queries/user_profile";
import { getUserProfileByUserId } from "#db/queries/user_profile";
import { updateUserProfile } from "#db/queries/user_profile";
import { createUserProfile } from "#db/queries/user_profile";
import { removeTripFromUserProfile } from "#db/queries/user_profile";
import { assignTripToUserProfile } from "#db/queries/user_profile";
import requireUser from "#middleware/requireUser";

user_profileRouter.get("/:userId", requireUser, async (req, res) => {
  let userProfile = await getUserProfileByUserId(req.params.userId);
  // Auto-create profile if it doesn't exist
  if (!userProfile) {
    userProfile = await createUserProfile(req.params.userId);
  }
  res.send(userProfile);
});

user_profileRouter.post("/", requireUser, async (req, res) => {
  const userProfile = await createUserProfile(req.user.id);
  res.status(201).send(userProfile);
});

user_profileRouter.put("/", requireUser, async (req, res) => {
  const updatedProfile = await updateUserProfile(req.user.id, req.body);
  res.send(updatedProfile);
});
user_profileRouter.post("/assign-trip", requireUser, async (req, res) => {
  const { tripId } = req.body;
  // Get or create user profile
  let userProfile = await getUserProfileByUserId(req.user.id);
  if (!userProfile) {
    userProfile = await createUserProfile(req.user.id);
  }
  const assignment = await assignTripToUserProfile(userProfile.id, tripId);
  res.status(201).send(assignment);
});
user_profileRouter.post("/remove-trip", requireUser, async (req, res) => {
  const { tripId } = req.body;
  // Get user profile
  const userProfile = await getUserProfileByUserId(req.user.id);
  if (!userProfile) {
    return res.status(404).send("User profile not found");
  }
  const removal = await removeTripFromUserProfile(userProfile.id, tripId);
  res.status(200).send(removal);
});

user_profileRouter.get("/:userId/trips", requireUser, async (req, res) => {
  const userProfile = await getUserProfileByUserId(req.params.userId);
  if (!userProfile) {
    return res.send([]);
  }
  const trips = await getTripsByUserProfileId(userProfile.id);
  res.send(trips);
});

export { user_profileRouter };
