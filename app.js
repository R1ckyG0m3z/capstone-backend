import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { tripsRouter } from "#api/trips";
import { user_profileRouter } from "#api/user_profile";
import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";

const app = express();
export default app;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.use("/trips", tripsRouter);
app.use("/user_profile", user_profileRouter);

app.use("/users", usersRouter);

const clientBuildPath = path.join(__dirname, "public");

app.use(express.static(clientBuildPath));

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
