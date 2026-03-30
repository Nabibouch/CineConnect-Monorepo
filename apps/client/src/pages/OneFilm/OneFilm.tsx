import { NewSubject } from './components/NewSubject';
import { NewCom } from '../../components/NewCom';
import FilmHeader from './components/Filmheader';
import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';


const OneFilm = () => {
    const { id } = useParams({ from: '/_register/films/$id' });
    const { data: film, isLoading, isError } = useOneFilm(id);

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;
    if (!film) return <div className="p-4">Film introuvable</div>;

    return (
        <div className="relative min-h-screen space-x-2 bg-toxic text-white">
            <FilmHeader />
            <div className='px-32'>
                <NewCom film={film} />
                <NewSubject />
            </div>
        </div>
    );
};

export default OneFilm;