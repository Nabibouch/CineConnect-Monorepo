import { useEffect, useState } from "react";
import { useFilms } from "../../../hook/useFilms";
import { useNavigate } from "@tanstack/react-router";
import type { Film } from "../../../utils/types";

const FilmSpotlight = () => {
  const { data: films, isLoading, isError } = useFilms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!films?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % films.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [films]);

  if (isLoading) return <div className="text-white">Chargement...</div>;
  if (isError) return <div className="text-red-500">Erreur lors du chargement</div>;
  if (!films?.length) return null;

  const film: Film = films[currentIndex];

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* image de fond */}
      <img
        key={film.id}
        src={film.poster_url ?? ""}
        alt={film.title}
        className="w-full h-full object-cover transition-opacity duration-700"
      />

      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* contenu */}
<div className="absolute inset-0 flex items-end justify-between p-16">
  {/* texte à gauche */}
  <div className="flex flex-col gap-4 max-w-lg">
    <h2 className="text-4xl font-bold text-white uppercase">{film.title}</h2>

    {film.released_date && (
      <p className="text-slate-400 text-sm">{new Date(film.released_date).getFullYear()}</p>
    )}

    {film.description && (
      <p className="text-slate-300 text-sm line-clamp-3">{film.description}</p>
    )}

    <button
      onClick={() => navigate({ to: '/films/$id', params: { id: String(film.id) } })}
      className="w-fit px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase rounded-full transition-all duration-300"
    >
      Voir le film
    </button>
  </div>

  {/* image à droite */}
  <img
  key={film.id}
  src={film.poster_url ?? ""}
  alt={film.title}
  style={{ objectPosition: "20% center" }}
  className="w-[320px] h-[400px] rounded-xl object-cover transition-opacity duration-700"
/>
</div>
    </section>
  );
};

export default FilmSpotlight;