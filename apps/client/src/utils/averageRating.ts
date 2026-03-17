import type { Film } from "./types";

export const getAverageRating = (film: Film): number => {
    if (!film.ratings.length) return 0;
    return film.ratings.reduce((sum, r) => sum + r.rate, 0) / film.ratings.length;
  };
  