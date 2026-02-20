import { Link } from "@tanstack/react-router";
import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 text-white bg-slate-800 pt-6">
      <span className="text-[40px] text-pink-500 font-bold">CinéConnect</span>
      <nav className="flex gap-10">
        <Link to="/"> Accueil </Link>
        <Link to="/film"> Films </Link>
        <span>Favoris</span>
      </nav>
      <div className="flex gap-10">
        <Search color="white" />
        <Bell color="white" />
        <User color="white" />
      </div>
    </header>
  );
};

export default Header;
