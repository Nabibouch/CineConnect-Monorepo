import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type WsMessage = {
  id?: number;
  content?: string;
  sender_id?: number;
  conversation_id?: number;
  created_at?: string;
  error?: string;
};

type UserConversation = {
  conversation_id: number;
};

const getDefaultBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  const fallbackBase = "http://localhost:3000";
  return apiUrl && apiUrl.length > 0 ? apiUrl : fallbackBase;
};

const normalizeBaseUrl = (raw: string) => raw.trim().replace(/\/$/, "");

const normalizeRestBaseUrl = (raw: string) => {
  const base = normalizeBaseUrl(raw);
  // Vos routes (films/users/conversations) ne sont pas sous /api, donc si VITE_API_URL
  // vaut ".../api" on le retire pour éviter les 404.
  return base.replace(/\/api$/i, "");
};

const Messages = () => {
  const baseUrl = getDefaultBaseUrl();
  const [userId, setUserId] = useState("1");
  const [conversationId, setConversationId] = useState("1");
  const [peerUserId, setPeerUserId] = useState("2");
  const [conversations, setConversations] = useState<UserConversation[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">(
    "disconnected",
  );
  const [events, setEvents] = useState<string[]>([]);
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const canSend = useMemo(
    () => status === "connected" && draft.trim().length > 0,
    [status, draft],
  );

  const addEvent = (event: string) => {
    setEvents((prev) => [...prev, event].slice(-20));
  };

  const connect = () => {
    if (!userId.trim()) {
      addEvent("Impossible de se connecter: userId vide.");
      return;
    }

    socketRef.current?.close();
    setStatus("connecting");

    const wsBase = normalizeRestBaseUrl(baseUrl).replace(/^http/i, "ws");
    const socket = new WebSocket(
      `${wsBase.replace(/\/$/, "")}?userId=${encodeURIComponent(userId.trim())}`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      addEvent(`Connecté en tant que user ${userId.trim()}.`);
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as WsMessage;
        setMessages((prev) => [...prev, parsed]);
        if (parsed.error) {
          addEvent(`Erreur serveur: ${parsed.error}`);
        }
      } catch {
        addEvent(`Message non JSON reçu: ${String(event.data)}`);
      }
    };

    socket.onerror = () => {
      addEvent("Erreur WebSocket.");
    };

    socket.onclose = () => {
      setStatus("disconnected");
      addEvent("Connexion fermée.");
    };
  };

  const refreshConversations = async (id: string) => {
    const trimmed = id.trim();
    if (!trimmed) return;

    setConversationsLoading(true);
    try {
      const restBaseUrl = normalizeRestBaseUrl(baseUrl);
      const res = await fetch(`${restBaseUrl}/conversations/user/${trimmed}`);
      const json = (await res.json()) as UserConversation[] | { error?: string };
      if (!res.ok) {
        const errorMsg =
          typeof json === "object" && json && "error" in json && json.error
            ? json.error
            : "Impossible de récupérer les conversations.";
        addEvent(errorMsg);
        setConversations([]);
        return;
      }

      const list = Array.isArray(json) ? json : [];
      setConversations(list);

      if (list.length > 0) {
        setConversationId(String(list[0].conversation_id));
      }
    } catch {
      addEvent("Erreur réseau lors de la récupération des conversations.");
      setConversations([]);
    } finally {
      setConversationsLoading(false);
    }
  };

  const createConversation = async () => {
    const me = Number(userId);
    const other = Number(peerUserId);
    if (!Number.isFinite(me) || !Number.isFinite(other)) {
      addEvent("userId / peerUserId doivent être des nombres.");
      return;
    }

    try {
      const restBaseUrl = normalizeRestBaseUrl(baseUrl);
      const res = await fetch(`${restBaseUrl}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: [me, other] }),
      });
      const json = (await res.json()) as { id?: number; error?: string };

      if (!res.ok || !json.id) {
        addEvent(json.error || "Impossible de créer la conversation.");
        return;
      }

      setConversationId(String(json.id));
      addEvent(`Conversation créée: ${json.id}`);
      await refreshConversations(userId);
    } catch {
      addEvent("Erreur réseau lors de la création de la conversation.");
    }
  };

  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
    setStatus("disconnected");
  };

  useEffect(() => {
    void refreshConversations(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      addEvent("Socket non connectée.");
      return;
    }
    if (!conversationId.trim() || !draft.trim()) {
      addEvent("conversationId et contenu sont requis.");
      return;
    }

    const payload = {
      conversationId: Number(conversationId),
      content: draft.trim(),
    };

    socketRef.current.send(JSON.stringify(payload));
    setDraft("");
  };

  return (
    <main className="flex-1 bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-wide">Test WebSocket</h1>

        <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              User ID
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Conversation ID (existant)
              <div className="flex gap-2">
                <input
                  value={conversationId}
                  onChange={(e) => setConversationId(e.target.value)}
                  className="w-40 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <button
                  onClick={() => refreshConversations(userId)}
                  className="rounded-md border border-slate-700 px-3 py-2 text-sm"
                  type="button"
                  disabled={conversationsLoading}
                >
                  {conversationsLoading ? "..." : "Rafraîchir"}
                </button>
              </div>
            </label>

            <button
              onClick={connect}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              type="button"
            >
              Connecter
            </button>

            <button
              onClick={disconnect}
              className="rounded-md border border-slate-700 px-4 py-2"
              type="button"
            >
              Déconnecter
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Créer une conversation avec userId
              <input
                value={peerUserId}
                onChange={(e) => setPeerUserId(e.target.value)}
                className="w-40 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              />
            </label>
            <button
              onClick={createConversation}
              className="rounded-md border border-slate-700 px-4 py-2"
              type="button"
            >
              Créer
            </button>

            <div className="text-sm text-slate-300">
              Conversations trouvées:{" "}
              <span className="font-medium text-white">
                {conversations.length}
              </span>
            </div>
          </div>

          <p className="text-sm">
            Statut:{" "}
            <span
              className={
                status === "connected"
                  ? "text-emerald-400"
                  : status === "connecting"
                    ? "text-amber-400"
                    : "text-slate-400"
              }
            >
              {status}
            </span>
          </p>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <form className="flex flex-wrap gap-3" onSubmit={sendMessage}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Votre message..."
              className="min-w-[260px] flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="mb-3 text-lg font-medium">Messages reçus</h2>
            <div className="max-h-80 space-y-2 overflow-y-auto text-sm">
              {messages.length === 0 ? (
                <p className="text-slate-400">Aucun message pour l’instant.</p>
              ) : (
                messages.map((message, index) => (
                  <div key={`${message.id ?? "m"}-${index}`} className="rounded-md border border-slate-800 p-2">
                    <p className="text-slate-300">
                      <span className="font-medium text-white">sender_id:</span>{" "}
                      {message.sender_id ?? "?"}
                    </p>
                    <p className="text-slate-300">
                      <span className="font-medium text-white">conversation_id:</span>{" "}
                      {message.conversation_id ?? "?"}
                    </p>
                    <p>{message.content ?? message.error ?? "(vide)"}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="mb-3 text-lg font-medium">Logs connexion</h2>
            <div className="max-h-80 space-y-2 overflow-y-auto text-sm">
              {events.length === 0 ? (
                <p className="text-slate-400">Aucun log.</p>
              ) : (
                events.map((event, index) => (
                  <p key={`${event}-${index}`} className="text-slate-300">
                    - {event}
                  </p>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Messages;
