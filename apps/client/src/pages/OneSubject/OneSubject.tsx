import { useParams } from '@tanstack/react-router';
import { useOneSubject } from '../../hook/useSubjects';
import { NewCom } from '../../components/NewCom';

export default function SubjectDetailsPage() {
    const { id } = useParams({ from: '/_register/subjects/$id' });

    const { data, isLoading, isError } = useOneSubject(id);

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const subject = data;

    if (!subject) return <div className="p-4">Sujet introuvable</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">{subject.title}</h1>
                <p className="text-gray-600">Post ID: {subject.id}</p>
                <p className="text-gray-600">Film ID: {subject.film_id || 'Aucun'}</p>
                <p className="text-gray-600">User ID: {subject.user_id}</p>
            </div>

            {/* Comments */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Commentaires</h2>

                {subject.comments?.length ? (
                    <ul className="space-y-3">
                        {subject.comments.map((comment) => (
                            <li key={comment.id} className="p-4 border rounded-2xl shadow-sm">
                                <p className="font-medium">{comment.title}</p>
                                <p className="text-sm text-gray-500">
                                    User: {comment.user_id} | Post: {comment.post_id}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun commentaire</p>
                )}
            </div>
            <NewCom subject={subject} />
        </div>
    );
}
