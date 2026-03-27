// src/services/apiConversation.ts
const url = import.meta.env.VITE_API_URL;

export const apiConversation = {
  createConversation: async (userIds: number[]) => {
    const response = await fetch(`${url}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userIds }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de la conversation');
    return response.json();
  },

  getUserConversations: async (userId: number) => {
    const response = await fetch(`${url}/conversations/user/${userId}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des conversations');
    return response.json();
  },
};