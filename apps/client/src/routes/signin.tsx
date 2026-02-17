import { createFileRoute } from "@tanstack/react-router"
import { SignInPage } from "../views/SignIn/SignIn"


export const Route = createFileRoute("/signin")({
  component: SignInPage,
})

