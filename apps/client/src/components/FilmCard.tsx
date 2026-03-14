import type { Film } from "../utils/types";
import { getAverageRating } from "../utils/averageRating";

interface FilmCardProps {
  film: Film;
}

const FilmCard = ({ film }: FilmCardProps) => {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      {film.poster_url && (
        <img
          src={film.poster_url}
          alt={film.title}
          className="w-full rounded-md object-cover"
        />
      )}
      <h2 className="text-xl font-semibold">{film.title}</h2>
      <p className="text-sm text-muted-foreground overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
        {film.description}
      </p>
      <p className="text-sm">
        <span className="font-medium">Auteur :</span>{" "}
        {film.author || "Inconnu"}
      </p>
      <div className="flex justify-between">
        <p className="text-sm">
          <span className="font-medium">Date de sortie :</span>{" "}
          {film.released_date
            ? new Date(film.released_date).toLocaleDateString()
            : "Inconnue"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Note :</span>{" "}
          {getAverageRating(film) || "Inconnue"}
        </p>
      </div>
    </article>
  );
};

export default FilmCard;

