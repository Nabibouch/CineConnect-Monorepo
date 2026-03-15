import { useQuery } from '@tanstack/react-query';
import { apiSubjects } from '../services/apiSubjects';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => apiSubjects.getAllSubjects(),
    staleTime: 10 * 60 * 1000,
  });
};
