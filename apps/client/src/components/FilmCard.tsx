import type { Film } from "../utils/types";
import { Link } from "@tanstack/react-router";

interface FilmCardProps {
  film: Film;
}

const FilmCard = ({ film }: FilmCardProps) => {
  return (
    <Link
      to="/films/$id"
      params={{ id: film.id.toString() }}
      className="block rounded-lg transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <article className="flex flex-col gap-3 rounded-lg p-4">
        {film.poster_url && (
          <img
            src={film.poster_url}
            alt={film.title}
            className="w-full rounded-3xl object-cover"
          />
        )}
        <h2 className="text-3xl text-white font-semibold">{film.title}</h2>
        <p className="text-2xl text-red-500">
          <span className="font-medium"></span>{" "}
          {film.released_date
            ? new Date(film.released_date).toLocaleDateString()
            : "Inconnue"}
        </p>
      </article>
    </Link>
  );
};

export default FilmCard;

