import { Link } from "@tanstack/react-router";
import { Bell, MessageSquareMore, User } from "lucide-react";
import { useMe } from "../hook/useUsers";

const Header = () => {
  const { data: me } = useMe();

  return (
    <header className="flex justify-between items-center px-12 text-white bg-slayer sticky top-0 z-50">
      <Link to= "/" className="text-[40px] font-bold">
        MOVIE<span className="text-primary">TUNE</span>
      </Link>
      <nav className="flex gap-10 text-[18px]">

        <Link to="/" 
        activeProps={{className: "text-rose-500 border-b-2 border-white"}}
        className="transition-tranform duration-300 ease-out hover:text-rose-500 hover:-translate-y-2 ">Home</Link>

        <Link to="/films" 
        activeProps={{className: "text-rose-500 border-b-2 border-white"}}
        className="transition-tranform duration-300 ease-out hover:text-rose-500 hover:-translate-y-2 ">Movies</Link>

        <Link to="/subjects" 
        activeProps={{className: "text-rose-500 border-b-2 border-white"}}
        className="transition-tranform duration-300 ease-out hover:text-rose-500 hover:-translate-y-2 ">Subjects</Link>
      </nav>

      <div className="flex gap-10 text-primary">
        <Link to="/messages">
          <MessageSquareMore />
        </Link>
        <Bell />
        {me ? (
          <Link to="/profil/$id" params={{ id: String(me.id) }}>
            <User />
          </Link>
        ) : (
          <User className="opacity-60" />
        )}
      </div>
    </header>
  );
};

export default Header;