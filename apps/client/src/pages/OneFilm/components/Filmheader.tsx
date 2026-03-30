import { RatingStars } from '../../OneFilm/components/oneboutton';
import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../../hook/useFilms';
import { useRateFilm } from '../../../hook/useRateFilm';
import { getAverageRating } from '../../../utils/averageRating';
import { Star } from 'lucide-react';

const FilmHeader = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data, isLoading, isError } = useOneFilm(id);
    const { mutate: rateFilm, isPending: isRatePending } = useRateFilm();

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const film = data;
    if (!film) return <div className="p-4">Film introuvable</div>;

    const averageRate = getAverageRating(film);

    const handleRate = (rate: number) => {
        rateFilm({ rate, film_id: Number(id), user_id: 1 });
    };

   return (
    <div
        className="relative w-full min-h-[500px] overflow-hidden"
        style={{
            backgroundImage: `url(${film.poster_url || 'https://via.placeholder.com/200x300'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        {/* Contenu principal */}
        <div className="relative z-10 flex flex-col min-h-[500px]">

    {/* Ligne image + infos */}
    <div className="flex items-stretch gap-8 px-32 py-8">

        {/* Affiche */}
        <img
            src={film.poster_url || 'https://via.placeholder.com/200x300'}
            alt={film.title}
            className="w-[300px] h-[420px] object-cover object-top rounded-xl shadow-2xl shadow-black flex-shrink-0 transition-transform duration-300 ease-out hover:scale-[1.05] self-center"
        />

        {/* Colonne infos */}
        <div className="flex flex-col justify-between flex-1 py-2">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 w-fit">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-lg">{averageRate.toFixed(1)}</span>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-4 flex-wrap">
                    <h1 className="text-6xl font-black uppercase text-rose-500">{film.title}</h1>
                    <p className="text-white text-xl font-semibold tracking-widest uppercase">
                        {film.released_date} , {film.language || 'VF'} , {film.author || 'Inconnu'}
                    </p>
                </div>
                <RatingStars
                    averageRate={averageRate}
                    isPending={isRatePending}
                    onRate={handleRate}
                />
            </div>
        </div>
    </div>

                    {/* Description — commence après l'image, alignée avec le bord gauche de l'image */}
                    <div className="mx-32">
                        <div className="">
                            <h2 className="text-3xl">
                                {film.description}
                            </h2>
                        </div>
                    </div>

            </div>
            </div>
    
);
};

export default FilmHeader;