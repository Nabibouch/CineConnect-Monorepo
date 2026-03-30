import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import type { Film } from "../utils/types";

const normalize = (value: string) => value.toLowerCase().trim();

export const useFilmSearch = (films?: Film[] | null) => {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const filteredFilms = useMemo(() => {
    if (!films) return films;
    const q = normalize(query);
    if (!q) return films;

    return films.filter((film) => {
      const actorsValue = (film as any).actors;
      const actorsText = Array.isArray(actorsValue)
        ? actorsValue.join(" ")
        : actorsValue ?? "";

      const haystack = [
        film.title,
        film.author,
        film.language,
        actorsText,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [films, query]);

  return { query, handleChange, filteredFilms };
};

