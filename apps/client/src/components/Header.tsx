import { Link } from "@tanstack/react-router";
import { Bell, MessageSquareMore, User } from "lucide-react";
import { useMe } from "../hook/useUsers";

const Header = () => {
  const { data: me } = useMe();

  return (
    <header className="flex justify-between items-center px-12 text-white bg-slayer">
      <span className="text-[40px]  font-bold">MOVIE<span className="text-primary">TUNE</span></span>
      <nav className="flex gap-10 text-[18px]">
        <Link to="/"> Home </Link>
        <Link to="/films"> Movies </Link>
        <Link to="/subjects">Subjects</Link>
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
  