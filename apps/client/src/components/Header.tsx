import { Link } from "@tanstack/react-router";
import { Bell, MessageSquareMore, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-12 text-white bg-slate-800">
      <span className="text-[40px]  font-bold">MOVIE<span className="text-primary">TUNE</span></span>
      <nav className="flex gap-10 text-[18px]">
        <Link to="/"> Home </Link>
        <Link to="/film"> Movies </Link>
        <span>Subjects</span>
      </nav>
      <div className="flex gap-10 text-primary">
        <MessageSquareMore />
        <Bell />
        <User />
      </div>
    </header>
  );
};

export default Header;
