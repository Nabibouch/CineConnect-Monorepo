export interface Rating {
  id: number;
  user_id: number;
  film_id: number;
  rate: number;
}

export interface Film {
  id: string;
  title: string;
  description: string;
  released_date: string;

}
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
