export interface Film {
  id: string;
  title: string;
  description: string;
  release_date: string;
}
const url = import.meta.env.VITE_LOCAL_URL;

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
