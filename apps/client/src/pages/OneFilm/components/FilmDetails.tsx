import { Link } from '@tanstack/react-router';
import type { Film } from '../../../utils/types';

type FilmDetailsProps = {
    film: Film;
};

export const FilmDetails = ({ film }: FilmDetailsProps) => {
    return (
        <div className="flex flex-col gap-6 my-8">
            <div className="flex flex-col gap-2">
                {/* <h3 className="text-xl">Description</h3>
                <p className="text-white font-medium text-xl">
                    {film.description}
                </p> */}
            </div>

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">
                    Acteurs
                </h2>
                <p>{film.actors || 'Non renseigné'}</p>
            </div>

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">
                    Récompenses
                </h2>
                <p>Introuvable</p>
            </div>

            {film.trailer && (
                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">
                        Bande-annonce
                    </h2>
                    <iframe
                        className="w-full h-64 rounded-2xl"
                        src={film.trailer}
                        title="Trailer"
                        allowFullScreen
                    />
                </div>
            )}

            <div>
                <h2 className="text-xl text-white font-semibold mb-2">
                    Posts liés
                </h2>

                {film.posts?.length ? (
                    <ul className="space-y-2">
                        {film.posts.map((post: any) => (
                            <Link
                                to="/subjects/$id"
                                params={{ id: post.id.toString() }}
                                key={post.id}
                                className="block p-3 border rounded-xl hover:bg-gray-100 transition duration-200 text-white hover:text-black"
                            >
                                {post.title}
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">Aucun post</p>
                )}
            </div>
        </div>
    );
};