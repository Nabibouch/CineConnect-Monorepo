import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiSubjects } from '../services/apiSubjects';
import type { CreateSubjectPayload } from '../services/apiSubjects';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => apiSubjects.getAllSubjects(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useOneSubject = (id: string) => {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => apiSubjects.getSubjectById(id),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newSubject: CreateSubjectPayload) => apiSubjects.createSubject(newSubject),
    onSuccess: () => {
      // Invalider les requêtes en lien avec les sujets pour forcer le rafraîchissement
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      queryClient.invalidateQueries({ queryKey: ['film'] });
    },
  });
};
