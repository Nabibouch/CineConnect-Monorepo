import { useFilmsHomepage } from "../../../hook/useFilms";
import Label from "../../../components/Label";
import { Star } from "lucide-react";
import FilmCard from "../../../components/FilmCard";

const TopRatedFilm = () => {
  const { data, isLoading, isError } = useFilmsHomepage();

  if (isLoading) return <div>Chargement...</div>;
  if (isError || !data) return <div>Erreur</div>;

  const { topRated } = data;

  return (
    <section className="flex flex-col gap-6 text-white">
      <div className="flex items-center justify-between">
        <Label title="Les mieux notés" icon={Star} />
        <span className="text-sm text-muted-foreground">
          {topRated.length} film{topRated.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-6 pb-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {topRated.map((film) => (
        //   <article
        //     key={film.id}
        //     className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm"
        //   >
        //     {film.poster_url && (
        //       <div className="mb-3 overflow-hidden rounded-lg">
        //         <img
        //           src={film.poster_url}
        //           alt={film.title}
        //           className="h-64 w-full object-cover"
        //         />
        //       </div>
        //     )}

        //     <h3 className="mb-2 text-lg font-semibold tracking-wide">
        //       {film.title}
        //     </h3>

        //     <p className="mb-3 text-sm text-muted-foreground overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
        //       {film.description}
        //     </p>

        //     <div className="space-y-1 text-xs text-slate-300">
        //       <p>
        //         <span className="font-medium">Auteur :</span>{" "}
        //         {film.author || "Inconnu"}
        //       </p>
        //       <p>
        //         <span className="font-medium">Date de sortie :</span>{" "}
        //         {film.released_date
        //           ? new Date(film.released_date).toLocaleDateString()
        //           : "Inconnue"}
        //       </p>
        //     </div>
        //   </article>
        <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedFilm;