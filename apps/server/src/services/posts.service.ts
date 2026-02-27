import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { postsTable } from "../db/schema.js";
import { normalizeId } from "../utils/normalizeId.js";
import { CreatePostInput, UpdatePostInput } from "../utils/postInput.js";

const postService = {
  async createPost(data: CreatePostInput) {
    try {
      if (!data.title) {
        throw new Error("Le titre est requis");
      }
      const [post] = await db.insert(postsTable).values(data).returning();
      return post;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la création du post");
    }
  },

  async findAllPosts() {
    try {
      const list = await db.select().from(postsTable);
      return list;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des posts");
    }
  },

  async findPostById(id: string) {
    try {
      const postId = normalizeId(id);
      const [post] = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, postId))
        .limit(1);
      if (!post) {
        throw new Error(`Aucun post avec l'id ${postId} n'a été trouvé`);
      }
      return post;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la récupération du post");
    }
  },

  async updateById(id: string, data: UpdatePostInput) {
    const postId = normalizeId(id);
    if (!Object.keys(data).length) {
      throw new Error("Aucune donnée envoyée");
    }
    const updated = await db
      .update(postsTable)
      .set(data)
      .where(eq(postsTable.id, postId))
      .returning();
    if (!updated.length) {
      throw new Error(`Aucun post avec l'id ${id} n'a été trouvé`);
    }
    return updated[0];
  },

  async removeById(id: string) {
    try {
      const postId = normalizeId(id);
      const [deleted] = await db
        .delete(postsTable)
        .where(eq(postsTable.id, postId))
        .returning();
      if (!deleted) {
        throw new Error(`Aucun post avec l'id ${postId} n'a été trouvé`);
      }
      return deleted;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la suppression du post");
    }
  },
};

export default postService;
