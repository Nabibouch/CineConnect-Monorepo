// src/hook/useAuth.ts
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return { user, loading, logout };
}