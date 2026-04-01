import { useActors } from "../../../hook/useActors";
import ActorCard from "../../Actors/components/ActorCard";
import type { Actor } from "../../../utils/types";

const AllActors = () => {
  const { data: actors, isLoading, isError } = useActors();

  if (isLoading) return <div className="p-4 text-white">Chargement...</div>;
  if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;
  if (!actors?.length) return null;

  return (
    <div className="min-h-screen bg-toxic text-white px-32 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold uppercase">
          Most Popular <span className="text-pink-500">Celebrities</span>
        </h1>
        <div className="w-16 h-1 bg-pink-500 mt-2" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
        {actors.map((actor: Actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default AllActors;