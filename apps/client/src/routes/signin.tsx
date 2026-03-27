import { createFileRoute } from "@tanstack/react-router";
import SignInPage from "../pages/SignIn/SignIn";


export const Route = createFileRoute("/signin")({
  component: SignInPage,
})

