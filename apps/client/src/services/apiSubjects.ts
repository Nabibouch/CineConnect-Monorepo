import type { Post } from "../utils/types";
const url = import.meta.env.VITE_API_URL;

export const apiSubjects = {
  getAllSubjects: async (): Promise<Post[]> => {
    const response = await fetch(`${url}/posts`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des commentaires');
    return response.json();
  },

  getSubjectById: async (id: string): Promise<Post> => {
    const response = await fetch(`${url}/posts/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du commentaire');
    return response.json();
  }
};
