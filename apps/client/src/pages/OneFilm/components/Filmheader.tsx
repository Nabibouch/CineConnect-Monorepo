import { RatingStars } from '../../OneFilm/components/oneboutton';
import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../../hook/useFilms';
import { useRateFilm } from '../../../hook/useRateFilm';
import { getAverageRating } from '../../../utils/averageRating';
import { FilmDetails } from './FilmDetails';


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
        className="relative flex gap-2 min-h-screen p-16"
        style={{
            backgroundImage: `url(${film.poster_url || 'https://via.placeholder.com/200x300'})`,
            backgroundSize: 'fill',
            backgroundPosition: 'center',
        }}
    >
        {/* Overlay sombre pour garder le texte lisible */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Contenu par-dessus l'overlay */}
        <div className="relative z-10 flex gap-2 px-16">
            <img
                src={film.poster_url || 'https://via.placeholder.com/200x300'}
                alt={film.title}
                className="w-80 h-80 object-cover object-top rounded-2xl shadow-2xl shadow-black"
            />
            <div className="flex flex-col gap-3">
                
                <h1 className="text-6xl text-rose-500">{film.title}</h1>
                <p className="text-white text-2xl">Langue: {film.language || 'Inconnue'}</p>
                <p className="text-white text-2xl">Auteur: {film.author || 'Inconnu'}</p>
                <p className="text-white text-2xl">Sortie: {film.released_date || 'Non renseignée'}</p>
                <h3 className="text-xl">Description</h3>
                <RatingStars
                    averageRate={averageRate}
                    isPending={isRatePending}
                    onRate={handleRate}
                />

                <div>
                    <h3 className="text-xl">Description</h3>
                    <p className="text-white font-medium text-xl">
                    {film.description}
                </p>
                </div>
                
            </div>

        </div>
    </div>
);
    
};

export default FilmHeader;