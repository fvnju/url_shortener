import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import "dotenv/config";

let uri = "";
try {
  uri = process.env.DATABASE_URL!;
  if (!uri) {
    throw new Error("no uri");
  }
} catch (error) {
  config({ path: ".env" });
  uri = process.env.DATABASE_URL!;
} finally {
  uri =
    "postgresql://neondb_owner:npg_LBrNXv3k8FmR@ep-fancy-field-a2lj6g41-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";
}

const sql = neon(uri);
const db = drizzle({ client: sql });
export default db;
