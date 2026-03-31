import { useMemo } from "react";
import type { Film } from "../utils/types";
import { useFilmThemeStore } from "./useFilmThemeStore";

export type FilmThemeDefinition = {
  title: string;
  image: string;
  bg_color: string;
};

// Source des thèmes affichés dans `FilterBar`.
export const FILM_THEMES: FilmThemeDefinition[] = [
  {
    title: "Science",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/4_p5aoit.png",
    bg_color: "bg-purple-500",
  },
  {
    title: "Aventure",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/3_p8pkip.png",
    bg_color: "bg-red-500",
  },
  {
    title: "Drame",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604862/1_yqp9rr.png",
    bg_color: "bg-[#00C0E8]",
  },
  {
    title: "Horreur",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/2_dky9er.png",
    bg_color: "bg-[#730E27]",
  },
  {
    title: "Crime",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/9_fxvpxs.png",
    bg_color: "bg-[#AC7F5E]",
  },
  {
    title: "Mystere",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/8_cxw7pt.png",
    bg_color: "bg-[#20F1C0]",
  },
  {
    title: "Comedie",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/5_zm5laa.png",
    bg_color: "bg-[#34c579]",
  },
  {
    title: "Fantasy",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/7_zspbt9.png",
    bg_color: "bg-[#FC0]",
  },
  {
    title: "Romance",
    image:
      "https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/6_yknsaz.png",
    bg_color: "bg-[#08F]",
  },
];

export const useFilmThemeFilter = (films?: Film[] | null) => {
  const selectedThemes = useFilmThemeStore((s) => s.selectedThemes);
  const selectTheme = useFilmThemeStore((s) => s.selectTheme);

  const filteredFilms = useMemo(() => {
    if (!films) return films;
    if (selectedThemes.length === 0) return films;

    return films.filter((film) => {
      const filmCategories = film.categories ?? [];
      // Un film passe le filtre s'il contient au moins un des thèmes sélectionnés (OR)
      return selectedThemes.some(theme => filmCategories.includes(theme));
    });
  }, [films, selectedThemes]);

  return { themes: FILM_THEMES, selectedThemes, selectTheme, filteredFilms };
};

