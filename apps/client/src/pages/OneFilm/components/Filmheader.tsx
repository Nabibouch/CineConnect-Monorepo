import { RatingStars } from '../../OneFilm/components/oneboutton';
import type { Film } from '../../../utils/types';

type FilmHeaderProps = {
    film: Film;
    averageRate: number;
    isRatePending: boolean;
    onRate: (value: number) => void;
};

export const FilmHeader = ({
    film,
    averageRate,
    isRatePending,
    onRate,
}: FilmHeaderProps) => {
    return (
        <div className="flex gap-2">
            <img
                src={film.poster_url || 'https://via.placeholder.com/200x300'}
                alt={film.title}
                className="w-80 h-80 object-cover object-top rounded-2xl shadow"
            />

            <div className="flex flex-col gap-2">
                <h1 className="text-6xl text-white">{film.title}</h1>

                <p className="text-white text-2xl">
                    Langue: {film.language || 'Inconnue'}
                </p>

                <p className="text-white text-2xl">
                    Auteur: {film.author || 'Inconnu'}
                </p>

                <p className="text-white text-2xl">
                    Sortie: {film.released_date || 'Non renseignée'}
                </p>

                <RatingStars
                    averageRate={averageRate}
                    isPending={isRatePending}
                    onRate={onRate}
                />
            </div>
        </div>
    );
};