import pg from "pg";

const options = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000, // 5 second connection timeout
  query_timeout: 10000, // 10 second query timeout
  statement_timeout: 10000, // 10 second statement timeout
};

// Azure PostgreSQL requires SSL
if (process.env.NODE_ENV === "production") {
  options.ssl = { rejectUnauthorized: false };
}

const db = new pg.Client(options);
export default db;
