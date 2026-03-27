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
        <div className="relative min-h-screen p-16 space-x-2 bg-toxic">
            <div className="flex flex-col gap-8 max-w-3xl mx-auto">
                <div className="space-y-2">
                    <h1 className="text-5xl text-white font-semibold">{subject.title}</h1>
                    {subject.description && (
                        <p className="text-white font-medium text-xl mt-4">{subject.description}</p>
                    )}
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Commentaires</h2>

                    {subject.comments?.length ? (
                        <ul className="space-y-3">
                            {subject.comments.map((comment) => (
                                <li
                                    key={comment.id}
                                    className="p-4 border border-slate-800 bg-slate-900/60 rounded-2xl shadow-sm"
                                >
                                    <p className="text-white font-medium">{comment.title}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white">Aucun commentaire</p>
                    )}
                </div>

            <NewCom subject={subject} />
            </div>
        </div>
    );
}
