
import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';
import { getAverageRating } from '../../utils/averageRating';

const OneFilm = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data, isLoading, isError } = useOneFilm(id);

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const film = data;

    if (!film) return <div className="p-4">Film introuvable</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex gap-6">
                <img
                    src={film.poster_url || 'https://via.placeholder.com/200x300'}
                    alt={film.title}
                    className="w-48 h-72 object-cover rounded-2xl shadow"
                />

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{film.title}</h1>
                    <p className="text-gray-600">Langue: {film.language || 'Inconnue'}</p>
                    <p className="text-gray-600">Auteur: {film.author || 'Inconnu'}</p>
                    <p className="text-gray-600">Sortie: {film.released_date || 'Non renseignée'}</p>
                    <p className="text-yellow-600 font-semibold">⭐ {getAverageRating(film) || "non noté"} / 5</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{film.description}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Acteurs</h2>
                <p>{film.actors || 'Non renseigné'}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Récompenses</h2>
                <p>{film.awards || 'Aucune'}</p>
            </div>

            {film.trailer && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Bande-annonce</h2>
                    <iframe
                        className="w-full h-64 rounded-2xl"
                        src={film.trailer}
                        title="Trailer"
                        allowFullScreen
                    />
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold mb-2">Posts liés</h2>
                {film.posts?.length ? (
                    <ul className="space-y-2">
                        {film.posts.map((post) => (
                            <li key={post.id} className="p-3 border rounded-xl">
                                {post.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun post</p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Commentaires</h2>
                {film.comments?.length ? (
                    <ul className="space-y-2">
                        {film.comments.map((comment) => (
                            <li key={comment.id} className="p-3 border rounded-xl">
                                {comment.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun commentaire</p>
                )}
            </div>
        </div>
    );
}

export default OneFilm;
