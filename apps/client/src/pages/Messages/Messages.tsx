import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../hook/useAuth";

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
  return base.replace(/\/api$/i, "");
};

const Messages = () => {
  const { user, loading } = useAuth();
  const baseUrl = getDefaultBaseUrl();
  const [conversationId, setConversationId] = useState<string>("");
  const [peerUserId, setPeerUserId] = useState("");
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
    () => status === "connected" && draft.trim().length > 0 && conversationId.trim().length > 0,
    [status, draft, conversationId],
  );

  const addEvent = (event: string) => {
    setEvents((prev) => [...prev, event].slice(-20));
  };

  useEffect(() => {
    if (!user?.id) return;

    socketRef.current?.close();
    setStatus("connecting");

    const wsBase = normalizeRestBaseUrl(baseUrl).replace(/^http/i, "ws");
    const socket = new WebSocket(
      `${wsBase.replace(/\/$/, "")}?userId=${encodeURIComponent(String(user.id))}`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      addEvent(`Connecté automatiquement en tant que user ${user.id}.`);
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

    return () => {
      socket.close();
      setStatus("disconnected");
    };
  }, [user?.id, baseUrl]);

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
        setConversationId((prev) => prev || String(list[0].conversation_id));
      }
    } catch {
      addEvent("Erreur réseau lors de la récupération des conversations.");
      setConversations([]);
    } finally {
      setConversationsLoading(false);
    }
  };

  // Si on reçoit un message pour une conversation que l'on ne connait pas encore (nouvelle conv),
  // on rafraîchit la liste des conversations automatiquement.
  useEffect(() => {
    if (messages.length === 0 || conversationsLoading || !user?.id) return;
    
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || !latestMessage.conversation_id) return;

    const isKnown = conversations.some(
      (c) => String(c.conversation_id) === String(latestMessage.conversation_id)
    );

    if (!isKnown) {
      void refreshConversations(String(user.id));
    }
  }, [messages, conversations, user?.id, conversationsLoading]);

  useEffect(() => {
    if (user?.id) {
      void refreshConversations(String(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const createConversation = async () => {
    if (!user?.id) return;
    const me = user.id;
    const other = Number(peerUserId);
    if (!Number.isFinite(me) || !Number.isFinite(other) || other <= 0) {
      addEvent("L'ID du destinataire doit être un nombre valide.");
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
      addEvent(`Conversation créée ou rejointe: ${json.id}`);
      await refreshConversations(String(user.id));
      setPeerUserId(""); // clear input
    } catch {
      addEvent("Erreur réseau lors de la création de la conversation.");
    }
  };

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

  if (loading) {
    return (
      <main className="flex-1 bg-slate-950 px-6 py-8 text-white">
        <p className="text-slate-400">Chargement de votre session...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 bg-slate-950 px-6 py-8 text-white">
        <p className="text-amber-400">Veuillez vous connecter pour accéder aux messages.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-wide">Messagerie</h1>

        <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-sm">
                Envoyer un message à (User ID)
                <input
                  value={peerUserId}
                  onChange={(e) => setPeerUserId(e.target.value)}
                  placeholder="ID du destinataire"
                  className="w-48 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </label>
              <button
                onClick={createConversation}
                disabled={!peerUserId.trim()}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                type="button"
              >
                Créer / Rejoindre
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-300">
                Vos conversations ({conversations.length}) :
              </div>
              {conversationsLoading && <span className="text-sm text-slate-500">Chargement...</span>}
            </div>

            {conversations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.conversation_id}
                    onClick={() => setConversationId(String(conv.conversation_id))}
                    className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      conversationId === String(conv.conversation_id)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    Conversation #{conv.conversation_id}
                  </button>
                ))}
              </div>
            )}

            <p className="text-sm mt-2">
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
                {status === "connected" ? "Connecté en temps réel" : status === "connecting" ? "Connexion..." : "Déconnecté"}
              </span>
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <form className="flex flex-wrap gap-3" onSubmit={sendMessage}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={conversationId ? `Message pour la conversation #${conversationId}...` : "Sélectionnez une conversation..."}
              disabled={!conversationId}
              className="min-w-[260px] flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white disabled:opacity-50"
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
            <h2 className="mb-3 text-lg font-medium">
              Messages {conversationId ? `(Conv #${conversationId})` : ""}
            </h2>
            <div className="max-h-80 space-y-3 overflow-y-auto text-sm">
              {messages.filter((m) => String(m.conversation_id) === conversationId || m.error).length === 0 ? (
                <p className="text-slate-400">Aucun message dans cette conversation.</p>
              ) : (
                messages
                  .filter((m) => String(m.conversation_id) === conversationId || m.error)
                  .map((message, index) => {
                    const isMe = message.sender_id === user?.id;
                    return (
                      <div
                        key={`${message.id ?? "m"}-${index}`}
                        className={`rounded-md border p-3 ${
                          isMe ? "ml-8 border-primary/30 bg-primary/10" : "mr-8 border-slate-700 bg-slate-800"
                        }`}
                      >
                        {message.error ? (
                          <p className="text-red-400">{message.error}</p>
                        ) : (
                          <>
                            <p className="mb-1 text-xs text-slate-400">
                              {isMe ? "Vous" : `User ${message.sender_id ?? "?"}`}
                            </p>
                            <p className="text-slate-200">{message.content ?? "(vide)"}</p>
                          </>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="mb-3 text-lg font-medium">Logs applicatifs</h2>
            <div className="max-h-80 space-y-2 overflow-y-auto text-sm">
              {events.length === 0 ? (
                <p className="text-slate-400">Aucun log.</p>
              ) : (
                events.map((event, index) => (
                  <p key={`${event}-${index}`} className="text-slate-400">
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

