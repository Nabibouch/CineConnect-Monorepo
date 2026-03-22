import { useState } from 'react';
import { useSendComs } from '../hook/useSendComs';
import type { Film, Comment, Post } from '../utils/types';

interface NewComProps {
    film?: Film;
    subject?: Post;
}

export const NewCom = ({ film, subject }: NewComProps) => {
    const [comment, setComment] = useState('');
    const { mutate: sendComment, isPending } = useSendComs();

    const parent = film || subject;

    if (!parent) return null;

    const handleSendComment = () => {
        const payload: Partial<Omit<Comment, 'id'>> = {
            title: comment,
            user_id: 1,
        };

        if (film) {
            payload.film_id = film.id;
        } else if (subject) {
            payload.post_id = subject.id;
        }

        sendComment(payload, { onSuccess: () => setComment('') });
    };

    return (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-sm mb-6 mt-6">
            <h2 className="text-xl font-bold mb-4 text-white">Commentaires</h2>

            {parent.comments?.length ? (
                <ul className="space-y-3 mb-6">
                    {parent.comments.map((comment: Comment) => (
                        <article
                            key={comment.id}
                            className="block p-4 bg-gray-700 border border-gray-600 rounded-xl hover:bg-gray-600 transition duration-200"
                        >
                            <span className="text-gray-200">{comment.title}</span>
                        </article>
                    ))}
                </ul>
            ) : (
                <p className="mb-6 text-gray-400 italic">Aucun commentaire pour le moment.</p>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                    type="text"
                    placeholder="Ajouter un commentaire..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    disabled={isPending}
                />
                <button
                    disabled={isPending || !comment.trim()}
                    onClick={handleSendComment}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? 'Envoi...' : 'Ajouter'}
                </button>
            </div>
        </div>
    );
};