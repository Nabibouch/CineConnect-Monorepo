import { ratingsTable } from "../db/schema.js";

export type RatingInput = Omit<typeof ratingsTable.$inferInsert, "id">;
