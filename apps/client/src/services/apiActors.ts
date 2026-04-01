import type { Actor } from "../utils/types";
const url = import.meta.env.VITE_API_URL;

export const apiActors = {
  getAllActors: async (): Promise<Actor[]> => {
    const response = await fetch(`${url}/actors`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des acteurs');
    return response.json();
  },

  getActorById: async (id: string): Promise<Actor> => {
    const response = await fetch(`${url}/actors/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de l\'acteur');
    return response.json();
  },
};