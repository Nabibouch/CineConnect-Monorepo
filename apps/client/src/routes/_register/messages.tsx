import { createFileRoute } from "@tanstack/react-router";
import Messages from "../../pages/Messages/Messages";

export const Route = createFileRoute("/_register/messages")({
  component: Messages,
});

