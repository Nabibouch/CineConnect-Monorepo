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
        <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedFilm;