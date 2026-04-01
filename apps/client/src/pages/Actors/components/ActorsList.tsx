import { useActors } from "../../../hook/useActors";
import ActorCard from "./ActorCard";
import type { Actor } from "../../../utils/types";
import { useNavigate } from "@tanstack/react-router";

const ActorsList = () => {
  const navigate = useNavigate(); // ← à l'intérieur du composant
  const { data: actors, isLoading, isError } = useActors();

  if (isLoading) return <div className="p-4 text-white">Chargement...</div>;
  if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;
  if (!actors?.length) return null;

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase">
            Most Popular <span className="text-rose-500">Celebrities</span>
          </h2>
          <div className="w-16 h-1 bg-rose-500 mt-2" />
        </div>
        <span
          onClick={() => navigate({ to: '/actors' })}
          className="text-white font-bold uppercase cursor-pointer hover:text-pink-500 transition-colors"
        >
          View <span className="text-pink-500">More</span>
        </span>
      </div>

      <div className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide">
        {actors.slice(0, 10).map((actor: Actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </section>
  );
};

export default ActorsList;