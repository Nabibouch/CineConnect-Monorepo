import { WebSocket, WebSocketServer } from 'ws';
import db from '../db/index.js';
import { messagesTable, conversationMembersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const clients = new Map<string, WebSocket>();

export function setupWebSocket(wss: WebSocketServer) {
  wss.on('connection', (ws, req) => {
    const userId = new URL(req.url!, 'http://localhost').searchParams.get('userId');
    if (!userId) return ws.close();

    clients.set(userId, ws);
    console.log(`User ${userId} connected`);

    ws.on('message', async (data) => {
      try {
        const { conversationId, content } = JSON.parse(data.toString());

        // Insert et retourne le message
        const [message] = await db
          .insert(messagesTable)
          .values({
            conversation_id: Number(conversationId), // 👈 integer, pas string
            sender_id: Number(userId),               // 👈 integer, pas string
            content,
          })
          .returning();

        // Récupère les membres de la conversation
        const members = await db
          .select({ user_id: conversationMembersTable.user_id })
          .from(conversationMembersTable)
          .where(eq(conversationMembersTable.conversation_id, Number(conversationId)));

        // Broadcast
        members.forEach(({ user_id }) => {
          const client = clients.get(String(user_id)); // 👈 Map stocke des strings
          if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (err) {
        console.error(`Error handling message from user ${userId}:`, err);
        ws.send(JSON.stringify({ error: 'Failed to process message' }));
      }
    });

    ws.on('close', () => {
      clients.delete(userId);
      console.log(`User ${userId} disconnected`);
    });
  });
}