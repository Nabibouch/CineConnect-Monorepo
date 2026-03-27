import { Link, useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';
import { getAverageRating } from '../../utils/averageRating';
import { useRateFilm } from '../../hook/useRateFilm';
import { useState } from 'react';
import { NewSubject } from './components/NewSubject';
import { NewCom } from '../../components/NewCom';

const OneFilm = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data, isLoading, isError } = useOneFilm(id);
    const [rate, setRate] = useState<number>(0);
    const { mutate: rateFilm, isPending: isRatePending } = useRateFilm();

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const film = data;

    if (!film) return <div className="p-4">Film introuvable</div>;

    return (
        <div className="relative min-h-screen p-16 space-x-2 bg-toxic">

    {/* <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-30"
        style={{
        backgroundImage: `url(${film.poster_url || 'https://via.placeholder.com/800x600'})`,
      }}
    />
        <div className="absolute inset-0 bg-black/60" /> */}

            <div className="flex gap-8">
                <img
                    src={film.poster_url || 'https://via.placeholder.com/200x300'}
                    alt={film.title}
                    className="w-80 h-80 object-cover object-top rounded-2xl shadow"
                />

                <div className="flex flex-col gap-2">
                    <h1 className="text-6xl text-white ">{film.title}</h1>
                    <p className="text-white text-2xl">Langue: {film.language || 'Inconnue'}</p>
                    <p className="text-white text-2xl">Auteur: {film.author || 'Inconnu'}</p>
                    <p className="text-white text-2xl">Sortie: {film.released_date || 'Non renseignée'}</p>
                    <p className="text-yellow-600 text-2xl font-semibold">⭐ {getAverageRating(film) || "non noté"} / 5</p> 
                </div>
            </div>

            <div>
                <p className="text-white font-medium text-4xl mt-8">{film.description}</p>
            </div>

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">Acteurs</h2>
                <p>{film.actors || 'Non renseigné'}</p>
            </div>

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">Récompenses</h2>
                <p>{film.awards || 'Aucune'}</p>
            </div>

            {film.trailer && (
                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Bande-annonce</h2>
                    <iframe
                        className="w-full h-64 rounded-2xl"
                        src={film.trailer}
                        title="Trailer"
                        allowFullScreen
                    />
                </div>
            )}

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">Posts liés</h2>
                {film.posts?.length ? (
                    <ul className="space-y-2">
                        {film.posts.map((post) => (
                            <Link to="/subjects/$id" params={{ id: post.id.toString() }} key={post.id} className="block p-3 border rounded-xl hover:bg-gray-100 transition duration-200">
                                {post.title}
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun post</p>
                )}
            </div>

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">Noter ce film</h2>
                <div className="flex items-center gap-4 mb-6">
                    <select
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="p-2 border rounded-xl"
                    >
                        <option value={0}>Sélectionner une note</option>
                        <option value={1}>1 - Mauvais</option>
                        <option value={2}>2 - Bof</option>
                        <option value={3}>3 - Moyen</option>
                        <option value={4}>4 - Bon</option>
                        <option value={5}>5 - Excellent</option>
                    </select>
                    <button
                        disabled={isRatePending || rate === 0}
                        onClick={() => rateFilm({ rate, film_id: Number(id), user_id: 1 }, { onSuccess: () => setRate(0) })}
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-xl disabled:bg-gray-300"
                    >
                        {isRatePending ? 'Envoi...' : 'Noter'}
                    </button>
                </div>
            </div>

            <NewCom film={film} />
            <NewSubject />
        </div>
    );
}

export default OneFilm;
