import type { Rating } from "../utils/types";
const url = import.meta.env.VITE_API_URL;

export type CreateRatingPayload = Partial<Omit<Rating, 'id'>>;

export const apiRatings = {
    createRating: async (payload: CreateRatingPayload): Promise<Rating> => {
        const response = await fetch(`${url}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de la note');
        }

        return response.json();
    }
};
