// src/services/conversations.service.ts
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { conversationsTable, conversationMembersTable } from "../db/schema.js";
import { normalizeId } from "../utils/normalizeId.js";

const conversationService = {
  async createConversation(userIds: number[]) {
    if (!userIds || userIds.length < 2) {
      throw new Error("Une conversation nécessite au moins 2 membres");
    }

    const [conversation] = await db
      .insert(conversationsTable)
      .values({})
      .returning();

    await db.insert(conversationMembersTable).values(
      userIds.map((user_id) => ({
        conversation_id: conversation.id,
        user_id,
      }))
    );

    return conversation;
  },

  async addMember(conversationId: string, userId: number) {
    const id = normalizeId(conversationId, "Id de conversation invalide");

    const [member] = await db
      .insert(conversationMembersTable)
      .values({ conversation_id: id, user_id: userId })
      .returning();

    return member;
  },

  async findAllByUserId(userId: string) {
    const id = normalizeId(userId, "Id utilisateur invalide");

    const conversations = await db
      .select({ conversation_id: conversationMembersTable.conversation_id })
      .from(conversationMembersTable)
      .where(eq(conversationMembersTable.user_id, id));

    return conversations;
  },
};

export default conversationService;
//