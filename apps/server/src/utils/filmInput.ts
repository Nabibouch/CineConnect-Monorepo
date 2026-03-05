import { filmsTable } from "../db/schema.js";

export type FilmInput = Partial<
  Omit<typeof filmsTable.$inferInsert, "id" | "created_at" | "released_date">
> & {
  released_date?: Date | string;
};
