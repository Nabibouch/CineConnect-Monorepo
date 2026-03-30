import { useFilms } from '../../hook/useFilms';
import { useFilmSearch } from '../../hook/useFilmSearch';
import { useFilmThemeFilter } from '../../hook/useFilmThemeFilter';
import FilmCard from '../../components/FilmCard';
import SearchBar from '../../components/Searchbar';
import FilterBar from '../../components/filterBar';


const Films = () => {
    const { data: films, isLoading, error } = useFilms();
    const { query, handleChange, filteredFilms } = useFilmSearch(films);
    const { themes, selectedTheme, selectTheme, filteredFilms: filteredByTheme } = useFilmThemeFilter(filteredFilms);

    if (isLoading) return <div>Chargement des films...</div>;
    if (error) return <div>Erreur lors du chargement des films.</div>;

    return (
        <div className="px-6 py-8 space-y-6 bg-toxic">
            <h1 className="text-3xl font-semibold tracking-wide text-white">Films</h1>

            <div className='flex justify-center '>
            <SearchBar value={query} onChange={handleChange}/>
            </div>
            <FilterBar themes={themes} selectedTheme={selectedTheme} onSelectTheme={selectTheme} />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {(filteredByTheme ?? filteredFilms)?.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
};

export default Films;