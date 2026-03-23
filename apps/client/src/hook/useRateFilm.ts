import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRatings, type CreateRatingPayload } from '../services/apiRating';

export const useRateFilm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newRating: CreateRatingPayload) => apiRatings.createRating(newRating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['film'] });
            queryClient.invalidateQueries({ queryKey: ['films'] });
        },
    });
};
