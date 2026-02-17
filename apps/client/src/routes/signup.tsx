
import { createFileRoute } from "@tanstack/react-router"
import { SignUpPage } from "../views/SignUp/SignUp"

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
})

