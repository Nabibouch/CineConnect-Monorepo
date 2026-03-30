import { NewSubject } from './components/NewSubject';
import { NewCom } from '../../components/NewCom';
import FilmHeader from './components/Filmheader';
import { useParams } from '@tanstack/react-router';
import { useOneFilm } from '../../hook/useFilms';
import { FilmDetails } from './components/FilmDetails';


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
                <FilmDetails film={film} />
                <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Commentaires</h2>

                    {film.comments?.length ? (
                        <ul className="space-y-3">
                            {film.comments.map((comment) => (
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
                <NewCom film={film} />
                <NewSubject />
            </div>
        </div>
    );
};

export default OneFilm;