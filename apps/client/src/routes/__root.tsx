import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";

const RootLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
