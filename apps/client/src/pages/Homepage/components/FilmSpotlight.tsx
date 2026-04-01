import { useEffect, useState } from "react";
import { useFilms } from "../../../hook/useFilms";
import { useNavigate } from "@tanstack/react-router";
import type { Film } from "../../../utils/types";

const FilmSpotlight = () => {
  const { data: films, isLoading, isError } = useFilms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!films?.length) return;

    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % films.length);
      setTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % films.length);
        setTransitioning(false);
      }, 700);
    }, 5000);

    return () => clearInterval(interval);
  }, [films, currentIndex]);

  if (isLoading) return <div className="text-white">Chargement...</div>;
  if (isError) return <div className="text-red-500">Erreur lors du chargement</div>;
  if (!films?.length) return null;

  const film: Film = films[currentIndex];
  const nextFilm: Film = films[nextIndex];

  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-black">

      {/* fond fixe */}
      <img
        src={film.poster_url ?? ""}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* slide actuel */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}>
        <img
          src={film.poster_url ?? ""}
          alt={film.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-between p-16">
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
          <img
            src={film.poster_url ?? ""}
            alt={film.title}
            style={{ objectPosition: "20% center" }}
            className="w-[320px] h-[400px] rounded-xl object-cover"
          />
        </div>
      </div>

      {/* slide suivant */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        transitioning ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src={nextFilm.poster_url ?? ""}
          alt={nextFilm.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-between p-16">
          <div className="flex flex-col gap-4 max-w-lg">
            <h2 className="text-4xl font-bold text-white uppercase">{nextFilm.title}</h2>
            {nextFilm.released_date && (
              <p className="text-slate-400 text-sm">{new Date(nextFilm.released_date).getFullYear()}</p>
            )}
            {nextFilm.description && (
              <p className="text-slate-300 text-sm line-clamp-3">{nextFilm.description}</p>
            )}
            <button
              onClick={() => navigate({ to: '/films/$id', params: { id: String(nextFilm.id) } })}
              className="w-fit px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase rounded-full transition-all duration-300"
            >
              Voir le film
            </button>
          </div>
          <img
            src={nextFilm.poster_url ?? ""}
            alt={nextFilm.title}
            style={{ objectPosition: "20% center" }}
            className="w-[320px] h-[400px] rounded-xl object-cover"
          />
        </div>
      </div>

    </section>
  );
};

export default FilmSpotlight;