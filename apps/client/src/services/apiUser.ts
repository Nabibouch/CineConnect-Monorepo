type ApiError = { error?: string };


export type UserById = {
  id: number;
  username: string;
  avatar_url: string | null;
  bio: string | null;
};

export type MeUser = {
  id: number;
  username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
};

export type FollowCounts = {
  followers: number;
  following: number;
};

const getBaseUrl = () => import.meta.env.VITE_API_URL as string;

const fetchJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(input, init);
  const json = (await res.json().catch(() => ({}))) as T & ApiError;
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur API");
  }
  return json;
};

export const apiUser = {
  getUserById: async (id: string): Promise<UserById> => {
    const baseUrl = getBaseUrl();
    const json = await fetchJson<{ user?: UserById }>(`${baseUrl}/users/${id}`, {
      credentials: "include",
    });
    if (!json.user) throw new Error("Réponse API invalide (getUserById)");
    return json.user;
  },

  getMe: async (): Promise<MeUser> => {

    const baseUrl = getBaseUrl();
    const json = await fetchJson<{ user?: MeUser }>(`${baseUrl}/users/me`, {
      credentials: "include",
    });
    if (!json.user) throw new Error("Réponse API invalide (getMe)");
    return json.user;
  },

  updateUser: async (
    id: string,
    payload: Partial<Pick<MeUser, "username" | "bio" | "avatar_url">>,
  ): Promise<MeUser> => {
    const baseUrl = getBaseUrl();
    const json = await fetchJson<{ user?: MeUser }>(`${baseUrl}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!json.user) throw new Error("Réponse API invalide (updateUser)");
    return json.user;
  },

  getFollowStatus: async (targetId: string, followerId: number): Promise<boolean> => {
    const baseUrl = getBaseUrl();
    const json = await fetchJson<{ isFollowing?: boolean }>(
      `${baseUrl}/users/${targetId}/follow-status/${followerId}`,
      { credentials: "include" },
    );
    return Boolean(json.isFollowing);
  },

  getFollowCounts: async (targetId: string): Promise<FollowCounts> => {
    const baseUrl = getBaseUrl();
    return fetchJson<FollowCounts>(`${baseUrl}/users/${targetId}/follow-counts`, {
      credentials: "include",
    });
  },

  followUser: async (targetId: string, followerId: number) => {
    const baseUrl = getBaseUrl();
    await fetchJson(`${baseUrl}/users/${targetId}/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ followerId }),
    });
  },

  unfollowUser: async (targetId: string, followerId: number) => {
    const baseUrl = getBaseUrl();
    await fetchJson(`${baseUrl}/users/${targetId}/follow`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ followerId }),
    });
  },
};