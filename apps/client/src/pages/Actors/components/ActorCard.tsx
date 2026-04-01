import type { Actor } from "../../../utils/types";
import { useNavigate } from "@tanstack/react-router";

const ActorCard = ({ actor }: { actor: Actor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center gap-4 cursor-pointer group"
      onClick={() => navigate({ to: `/actors/${actor.id}` })}
    >
      <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-transparent group-hover:border-rose-500 transition-all duration-300">
        {actor.poster_url ? (
          <img
            src={actor.poster_url}
            alt={actor.name ?? ""}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
            ?
          </div>
        )}
      </div>
      <p className="text-white font-sans font-bold text-lg uppercase tracking-wide group-hover:text-rose-500 transition-colors duration-300">
        {actor.name}
      </p>
    </div>
  );
};

export default ActorCard;