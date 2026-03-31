import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiUser, type FollowCounts, type MeUser, type UserById } from "../services/apiUser";

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

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiUser.updateUser.bind(null, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["me"] });
      void queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};

export const useFollowStatus = (targetId: string, followerId?: number) => {
  return useQuery<boolean, Error>({
    queryKey: ["follow-status", targetId, followerId],
    enabled: Boolean(targetId.trim()) && Boolean(followerId),
    queryFn: () => apiUser.getFollowStatus(targetId, followerId as number),
    staleTime: 60 * 1000,
  });
};

export const useFollowCounts = (targetId: string) => {
  return useQuery<FollowCounts, Error>({
    queryKey: ["follow-counts", targetId],
    enabled: Boolean(targetId.trim()),
    queryFn: () => apiUser.getFollowCounts(targetId),
    staleTime: 60 * 1000,
  });
};

export const useFollowActions = (targetId: string) => {
  const queryClient = useQueryClient();
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["follow-counts", targetId] });
    void queryClient.invalidateQueries({ queryKey: ["follow-status", targetId] });
  };

  const follow = useMutation({
    mutationFn: (followerId: number) => apiUser.followUser(targetId, followerId),
    onSuccess: invalidate,
  });

  const unfollow = useMutation({
    mutationFn: (followerId: number) => apiUser.unfollowUser(targetId, followerId),
    onSuccess: invalidate,
  });

  return { follow, unfollow };
};