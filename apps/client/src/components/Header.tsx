import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, MessageSquareMore, User, LogOut } from "lucide-react";
import { useAuth } from "../hook/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/signin" });
  };

  return (
    <header className="flex justify-between items-center px-12 text-white bg-slayer">
      <span className="text-[40px] font-bold">
        MOVIE<span className="text-primary">TUNE</span>
      </span>
      <nav className="flex gap-10 text-[18px]">
        <Link to="/">Home</Link>
        <Link to="/films">Movies</Link>
        <Link to="/subjects">Subjects</Link>
      </nav>
      <div className="flex gap-10 text-primary items-center">
        <MessageSquareMore />
        <Bell />
        {user ? (
          <>
            <span className="text-sm">{user.username}</span>
            <LogOut className="cursor-pointer" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/signin">
            <User />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;