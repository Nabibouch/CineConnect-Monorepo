import { useQuery } from '@tanstack/react-query';
import { apiActors } from '../services/apiActors';

export const useActors = () => {
  return useQuery({
    queryKey: ['actors'],
    queryFn: () => apiActors.getAllActors(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useActorById = (id: string) => {
  return useQuery({
    queryKey: ['actor', id],
    queryFn: () => apiActors.getActorById(id),
    staleTime: 10 * 60 * 1000,
  });
};