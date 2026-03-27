import type { Film } from "../utils/types";
const url = import.meta.env.VITE_API_URL;

export const apiFilm = {
  getAllFilms: async (): Promise<Film[]> => {
    const response = await fetch(`${url}/films`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des films');
    return response.json();
  },

  getFilmById: async (id: string): Promise<Film> => {
    const response = await fetch(`${url}/films/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du film');
    return response.json();
  }
};
