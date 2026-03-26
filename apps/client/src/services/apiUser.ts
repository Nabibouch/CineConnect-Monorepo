type ApiError = { error?: string };

// const getRestBaseUrl = () => {
//   const raw = import.meta.env.VITE_API_URL as string | undefined;
//   const base = raw ?? "";
//   // Dans votre config, VITE_API_URL termine par "/api" mais les routes users
//   // ne sont pas sous "/api", donc on retire le suffixe.
//   return base.replace(/\/api\/?$/i, "");
// };


export type UserById = {
  id: number;
  username: string;
};

export type MeUser = {
  id: number;
  email: string;
};

export const apiUser = {
  getUserById: async (id: string): Promise<UserById> => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${baseUrl}/users/${id}`, { credentials: "include" });
    const json = (await res.json().catch(() => ({}))) as ApiError & { user?: UserById };

    if (!res.ok) {
      throw new Error(json.error ?? `Erreur lors de la récupération de l'utilisateur (${id})`);
    }

    if (!json.user) throw new Error("Réponse API invalide (getUserById)");
    return json.user;
  },

  getMe: async (): Promise<MeUser> => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${baseUrl}/users/me`, { credentials: "include" });
    const json = (await res.json().catch(() => ({}))) as ApiError & { user?: MeUser };

    if (!res.ok) {
      throw new Error(json.error ?? "Erreur lors de la récupération de l'utilisateur connecté");
    }

    if (!json.user) throw new Error("Réponse API invalide (getMe)");
    return json.user;
  },
};

