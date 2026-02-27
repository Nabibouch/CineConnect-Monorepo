import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { commentsTable } from "../db/schema.js";
import { normalizeId } from "../utils/normalizeId.js";
import { CreateCommentInput, UpdateCommentInput } from "../utils/commentInput.js";

const commentService = {
  async createComment(data: CreateCommentInput) {
    try {
      if (!data.title || data.user_id == null) {
        throw new Error("title et user_id sont requis");
      }
      const [comment] = await db.insert(commentsTable).values(data).returning();
      return comment;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la création du commentaire");
    }
  },

  async findAllComments() {
    try {
      const list = await db.select().from(commentsTable);
      return list;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des commentaires");
    }
  },

  async findCommentById(id: string) {
    try {
      const commentId = normalizeId(id);
      const [comment] = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);
      if (!comment) {
        throw new Error(
          `Aucun commentaire avec l'id ${commentId} n'a été trouvé`,
        );
      }
      return comment;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la récupération du commentaire");
    }
  },

  async updateById(id: string, data: UpdateCommentInput) {
    const commentId = normalizeId(id);
    if (!Object.keys(data).length) {
      throw new Error("Aucune donnée envoyée");
    }
    const updated = await db
      .update(commentsTable)
      .set(data)
      .where(eq(commentsTable.id, commentId))
      .returning();
    if (!updated.length) {
      throw new Error(`Aucun commentaire avec l'id ${id} n'a été trouvé`);
    }
    return updated[0];
  },

  async removeById(id: string) {
    try {
      const commentId = normalizeId(id);
      const [deleted] = await db
        .delete(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .returning();
      if (!deleted) {
        throw new Error(
          `Aucun commentaire avec l'id ${commentId} n'a été trouvé`,
        );
      }
      return deleted;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la suppression du commentaire");
    }
  },
};

export default commentService;
