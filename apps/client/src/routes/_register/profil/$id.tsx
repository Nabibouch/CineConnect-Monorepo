import { createFileRoute } from "@tanstack/react-router";
import Profil from "../../../pages/Profil/Profil";

export const Route = createFileRoute("/_register/profil/$id")({
  component: Profil,
});
