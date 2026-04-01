import { useParams } from "@tanstack/react-router";
import { useActorById } from "../../hook/useActors";

const OneActor = () => {
  const { id } = useParams({ from: '/_register/actors/$id' });
  const { data: actor, isLoading, isError } = useActorById(id);

  if (isLoading) return <div className="p-4 text-white">Chargement...</div>;
  if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;
  if (!actor) return <div className="p-4 text-white">Acteur introuvable</div>;

  return (
    <div className="min-h-screen bg-toxic text-white px-32 py-16">
      <div className="flex gap-16 items-start">
        <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-rose-500 shrink-0">
          {actor.poster_url ? (
            <img
              src={actor.poster_url}
              alt={actor.name ?? ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
              ?
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold uppercase">
            {actor.name}
          </h1>
          <div className="w-16 h-1 bg-rose-500" />
          {actor.biography ? (
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              {actor.biography}
            </p>
          ) : (
            <p className="text-slate-500">Aucune biographie disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneActor;