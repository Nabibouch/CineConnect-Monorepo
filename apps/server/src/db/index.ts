import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import ENV from "../config/ENV.js";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

const db = drizzle(pool);

export default db;
