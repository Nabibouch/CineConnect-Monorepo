import type { Comment } from "../utils/types";
const url = import.meta.env.VITE_API_URL;

export type CreateCommentPayload = Partial<Omit<Comment, 'id'>>;

export const apiComments = {
    createComment: async (payload: CreateCommentPayload): Promise<Comment> => {
        const response = await fetch(`${url}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du commentaire');
        }

        return response.json();
    }
};
