import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { ratingsTable } from "../db/schema.js";
import { normalizeId } from "../utils/normalizeId.js";
import { RatingInput } from "../utils/ratingInput.js";

const ratingService = {
  async createRating(data: RatingInput) {
    try {
      if (data.user_id == null || data.film_id == null || data.rate == null) {
        throw new Error("user_id, film_id et rate sont requis");
      }
      const [rating] = await db
        .insert(ratingsTable)
        .values({
          user_id: data.user_id,
          film_id: data.film_id,
          rate: data.rate,
        })
        .returning();
      return rating;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la création du rating");
    }
  },

  async findAllRatings() {
    try {
      const list = await db.select().from(ratingsTable);
      return list;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des ratings");
    }
  },

  async findRatingById(id: string) {
    try {
      const ratingId = normalizeId(id);
      const [rating] = await db
        .select()
        .from(ratingsTable)
        .where(eq(ratingsTable.id, ratingId))
        .limit(1);
      if (!rating) {
        throw new Error(`Aucun rating avec l'id ${ratingId} n'a été trouvé`);
      }
      return rating;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la récupération du rating");
    }
  },

  async updateById(id: string, data: RatingInput) {
    const ratingId = normalizeId(id);
    if (!Object.keys(data).length) {
      throw new Error("Aucune donnée envoyée");
    }
    const updated = await db
      .update(ratingsTable)
      .set(data)
      .where(eq(ratingsTable.id, ratingId))
      .returning();
    if (!updated.length) {
      throw new Error(`Aucun rating avec l'id ${id} n'a été trouvé`);
    }
    return updated[0];
  },

  async removeById(id: string) {
    try {
      const ratingId = normalizeId(id);
      const [deleted] = await db
        .delete(ratingsTable)
        .where(eq(ratingsTable.id, ratingId))
        .returning();
      if (!deleted) {
        throw new Error(`Aucun rating avec l'id ${ratingId} n'a été trouvé`);
      }
      return deleted;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la suppression du rating");
    }
  },
};

export default ratingService;
