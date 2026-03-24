import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiComments, type CreateCommentPayload } from '../services/apiComments';

export const useSendComs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newComment: CreateCommentPayload) => apiComments.createComment(newComment),
        onSuccess: () => {
            // On invalide les requêtes liées aux films pour recharger les données incluant le nouveau commentaire
            queryClient.invalidateQueries({ queryKey: ['film'] });
            queryClient.invalidateQueries({ queryKey: ['films'] });
        },
    });
};
