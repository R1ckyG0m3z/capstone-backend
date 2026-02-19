import "dotenv/config";
import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 5000;

// Connect to DB without blocking startup
db.connect().catch((err) => {
  console.error("Database connection error:", err.message);
  console.error(
    "App will still start, but DB queries will fail until connection is established.",
  );
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
