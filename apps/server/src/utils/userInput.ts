import { usersTable } from "../db/schema.js";

export type UserInput = Partial<
  Omit<typeof usersTable.$inferInsert, "id" | "created_at">
>;

