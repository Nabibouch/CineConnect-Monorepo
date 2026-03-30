import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';
import { useRateFilm } from '../../hook/useRateFilm';
import { NewSubject } from './components/NewSubject';
import { NewCom } from '../../components/NewCom';
import { getAverageRating } from '../../utils/averageRating';
import { FilmDetails } from './components/FilmDetails';
import { FilmHeader } from './components/Filmheader';

const OneFilm = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data, isLoading, isError } = useOneFilm(id);
    const { mutate: rateFilm, isPending: isRatePending } = useRateFilm();

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const film = data;

    if (!film) return <div className="p-4">Film introuvable</div>;

    const averageRate = getAverageRating(film);

    return (
    <div className="relative min-h-screen p-16 space-x-2 bg-toxic text-white">
        
        <FilmHeader
            film={film}
            averageRate={averageRate}
            isRatePending={isRatePending}
            onRate={(value) =>
                rateFilm({
                    rate: value,
                    film_id: Number(id),
                    user_id: 1,
                })
            }
        />

        <FilmDetails film={film} />
        <NewCom film={film} />
        <NewSubject />
    </div>
);
    
};

export default OneFilm;