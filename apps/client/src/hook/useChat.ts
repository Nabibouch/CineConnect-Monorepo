// src/hook/useChat.ts
import { useEffect, useRef, useState } from 'react';
import type { Message } from '../utils/types';

const WS_URL = import.meta.env.VITE_WS_URL;

export function useChat(userId: number, conversationId: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`${WS_URL}?userId=${userId}`);

    ws.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      if (message.conversation_id === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket déconnecté');
    };

    return () => {
      ws.current?.close();
    };
  }, [userId, conversationId]);

  const sendMessage = (content: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ conversationId, content }));
    }
  };

  return { messages, sendMessage };
}
