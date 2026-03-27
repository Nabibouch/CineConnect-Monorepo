import { useFilms } from '../../hook/useFilms';
import FilmCard from '../../components/FilmCard';

const Films = () => {
    const { data: films, isLoading, error } = useFilms();

    if (isLoading) return <div>Chargement des films...</div>;
    if (error) return <div>Erreur lors du chargement des films.</div>;

    return (
        <div className="px-6 py-8 space-y-6 bg-toxic">
            <h1 className="text-3xl font-semibold tracking-wide">Films</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {films?.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
};

export default Films;