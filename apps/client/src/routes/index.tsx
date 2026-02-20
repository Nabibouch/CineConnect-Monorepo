import { createFileRoute } from "@tanstack/react-router";
import Homepage from "../views/Homepage/Homepage";

export const Route = createFileRoute("/")({
  component: Homepage,
});
