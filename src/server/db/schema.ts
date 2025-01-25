import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const shortUrl = pgTable("ShortUrl", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  originalUrl: varchar("originalUrl", { length: 2048 }).notNull(),
  shortCode: varchar("shortCode", { length: 16 }).notNull().unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  expiresAt: timestamp("expiresAt", { mode: "date" }),
  clicks: integer("clicks").notNull().default(0),
  lastAccessed: timestamp("lastAccessed", { mode: "date" }),
});

export type InsertShortUrl = typeof shortUrl.$inferInsert;
export type SelectShortUrl = typeof shortUrl.$inferSelect;
