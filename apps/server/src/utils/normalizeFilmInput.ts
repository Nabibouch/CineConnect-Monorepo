import { filmsTable } from "../db/schema.js";
import { FilmInput } from "./filmInput.js";
export function normalizeFilmInput(
  data: FilmInput,
): Partial<typeof filmsTable.$inferInsert> {
  const { released_date, ...rest } = data;

  const dataToPush: Partial<typeof filmsTable.$inferInsert> = {
    ...rest,
    ...(released_date !== undefined && {
      released_date:
        typeof released_date === "string"
          ? new Date(released_date)
          : released_date,
    }),
  };

  return dataToPush;
}