import { Link, useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';
import { useRateFilm } from '../../hook/useRateFilm';
import { useState } from 'react';
import { NewSubject } from './components/NewSubject';
import { NewCom } from '../../components/NewCom';
import { Star } from 'lucide-react';
import { getAverageRating } from '../../utils/averageRating';

const OneFilm = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data, isLoading, isError } = useOneFilm(id);
    const [hoverRate, setHoverRate] = useState<number>(0);
    const { mutate: rateFilm, isPending: isRatePending } = useRateFilm();

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const film = data;

    if (!film) return <div className="p-4">Film introuvable</div>;

    const averageRate = getAverageRating(film);
    const displayedRate = hoverRate || averageRate;

    return (
        <div className="relative min-h-screen p-16 space-x-2 bg-toxic text-white">

    {/* <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-30"
        style={{
        backgroundImage: `url(${film.poster_url || 'https://via.placeholder.com/800x600'})`,
      }}
    />
        <div className="absolute inset-0 bg-black/60" /> */}

            <div className="flex gap-2">
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
                    <div>
                        <p className="text-white text-sm mb-2">Ta note</p>
                        <div className="flex items-center gap-3" onMouseLeave={() => setHoverRate(0)}>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, index) => {
                                    const starNumber = index + 1;
                                    const fillPercent = Math.min(Math.max(displayedRate - index, 0), 1) * 100;

                                    return (
                                        <button
                                            key={starNumber}
                                            type="button"
                                            disabled={isRatePending}
                                            onMouseMove={(event) => {
                                                const rect = event.currentTarget.getBoundingClientRect();
                                                const isHalf = event.clientX - rect.left < rect.width / 2;
                                                setHoverRate(isHalf ? index + 0.5 : starNumber);
                                            }}
                                            onFocus={() => setHoverRate(starNumber)}
                                            onClick={(event) => {
                                                const rect = event.currentTarget.getBoundingClientRect();
                                                const isHalf = event.clientX - rect.left < rect.width / 2;
                                                const selectedRate = isHalf ? index + 0.5 : starNumber;
                                                rateFilm({ rate: selectedRate, film_id: Number(id), user_id: 1 });
                                            }}
                                            className="rounded-md p-0 transition-transform duration-150 hover:scale-110 disabled:cursor-not-allowed"
                                            aria-label={`Noter ${starNumber} sur 5`}
                                        >
                                            <div className="relative h-8 w-8">
                                                <Star className="h-8 w-8 text-slate-500" />
                                                <div
                                                    className="absolute left-0 top-0 h-8 overflow-hidden"
                                                    style={{ width: `${fillPercent}%` }}
                                                >
                                                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <span className="text-white text-lg min-w-20">
                                {isRatePending ? 'Envoi...' : `${displayedRate.toFixed(1)}/5`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-6 my-8'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-xl'>Description</h3>
                    <p className="text-white font-medium text-xl">{film.description}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Acteurs</h2>
                    <p>{film.actors || 'Non renseigné'}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Récompenses</h2>
                    <p>Introuvable</p>
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
                                <Link to="/subjects/$id" params={{ id: post.id.toString() }} key={post.id} className="block p-3 border rounded-xl hover:bg-gray-100 transition duration-200 text-white hover:text-black">
                                    {post.title}
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-white'>Aucun post</p>
                    )}
                </div>
            </div>

            <NewCom film={film} />
            <NewSubject />
        </div>
    );
}

export default OneFilm;
