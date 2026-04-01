import type { Film } from "../utils/types";
import { Link } from "@tanstack/react-router";

interface FilmCardProps {
  film: Film;
}

const FilmCard = ({ film }: FilmCardProps) => {
  const averageRating = film.ratings && film.ratings.length > 0
    ? (film.ratings.reduce((acc, curr) => acc + curr.rate, 0) / film.ratings.length).toFixed(1)
    : "-";

  return (
    <Link
      to="/films/$id"
      params={{ id: film.id.toString() }}
      className="block rounded-lg transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <article className="flex flex-col gap-3 rounded-lg p-4">
        {film.poster_url && (
          <div className="relative group overflow-hidden rounded-3xl">
            <img
              src={film.poster_url}
              alt={film.title}
              className="w-full object-cover"
            />
            {/* Overlay Gradient (fade in on hover) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none" />
            <h2 className="text-lg text-white font-medium absolute bottom-4 left-6 opacity-0 translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">{film.title}</h2>
            {/* Rating badge (slide up and fade in on bottom right) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 text-white px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-sm">{averageRating}</span>
            </div>
          </div>
        )}
      </article>
    </Link>
  );
};

export default FilmCard;

