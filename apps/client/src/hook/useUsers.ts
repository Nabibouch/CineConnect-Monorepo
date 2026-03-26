import { useQuery } from "@tanstack/react-query";
import { apiUser, type MeUser, type UserById } from "../services/apiUser";

export const useMe = () => {
  return useQuery<MeUser, Error>({
    queryKey: ["me"],
    queryFn: apiUser.getMe,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useUserById = (id: string) => {
  return useQuery<UserById, Error>({
    queryKey: ["user", id],
    enabled: Boolean(id.trim()),
    queryFn: () => apiUser.getUserById(id),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};

