import { useFilms } from "../../../hook/useFilms";


const Allfilm = () => {
  const { data: films, isLoading } = useFilms();

  if (isLoading) return <div>Chargement...</div>;

  return (
    <main className="flex flex-col bg-slate-950 flex-1 gap-6 py-6 px-20">
      <h1 className="text-3xl font-bold text-white mb-6">Tous les films</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {films?.map((film) => (
          <div key={film.id} className="bg-slate-800 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white">{film.title}</h2>
            <p className="text-gray-300 text-sm mt-2">{film.description}</p>
            {film.poster_url && (
              <img 
                src={film.poster_url} 
                alt={film.title}
                className="w-full h-64 object-cover rounded mt-4"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Allfilm;
