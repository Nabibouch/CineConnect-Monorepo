import db from "../db/index.js";
import {
  commentsTable,
  filmsTable,
  postsTable,
  ratingsTable,
} from "../db/schema.js";
import { eq } from "drizzle-orm";
import { FilmInput } from "../utils/filmInput.js";
import { normalizeFilmInput } from "../utils/normalizeFilmInput.js";
import { normalizeId } from "../utils/normalizeId.js";

const filmService = {
  async createFilm(data: FilmInput) {
    try {
      if (!data.title || !data.description) {
        throw new Error("Tout les champs doivent être remplis");
      }

      const dataToPush = normalizeFilmInput(
        data,
      ) as typeof filmsTable.$inferInsert;

      const [film] = await db.insert(filmsTable).values(dataToPush).returning();
      return film;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  },

  async findAllFilms() {
    try {
      const films = await db.select().from(filmsTable);
      const posts = await db.select().from(postsTable);
      const comments = await db.select().from(commentsTable);
      const ratings = await db.select().from(ratingsTable);

      return films.map((film) => ({
        ...film,
        posts: posts.filter((p) => p.film_id === film.id),
        comments: comments.filter((c) => c.film_id === film.id),
        ratings: ratings.filter((r) => r.film_id === film.id),
      }));
    } catch (error) {
      throw new Error("Erreur lors de la récupération des films");
    }
  },

  async updateById(id: string, data: FilmInput) {
    const filmId = normalizeId(id);

    if (!Object.keys(data).length) {
      throw new Error("Aucune donnée envoyée");
    }

    const dataToUpdate = normalizeFilmInput(data);

    const updatedFilm = await db
      .update(filmsTable)
      .set(dataToUpdate)
      .where(eq(filmsTable.id, filmId))
      .returning();

    if (!updatedFilm.length) {
      throw new Error(`Aucun film avec l'id ${id} n'a été trouvé`);
    }

    return updatedFilm[0];
  },

  async findFilmById(id: string) {
    try {
      const filmId = normalizeId(id);
      const [film] = await db
        .select()
        .from(filmsTable)
        .where(eq(filmsTable.id, filmId))
        .limit(1);
      if (!film) {
        throw new Error(`Aucun film avec l'id ${filmId} n'a été trouvé`);
      }

      const [posts, comments, ratings] = await Promise.all([
        db.select().from(postsTable).where(eq(postsTable.film_id, filmId)),
        db.select().from(commentsTable).where(eq(commentsTable.film_id, filmId)),
        db.select().from(ratingsTable).where(eq(ratingsTable.film_id, filmId)),
      ]);

      return {
        ...film,
        posts,
        comments,
        ratings,
      };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la récupération dans la base de données");
    }
  },

  async removeById(id: string) {
    try {
      const filmId = normalizeId(id);
      const deletedFilm = await db
        .delete(filmsTable)
        .where(eq(filmsTable.id, filmId))
        .returning();
      if (!deletedFilm.length) {
        throw new Error(`Aucun film avec l'id ${filmId} n'as été trouvé`);
      }
      return deletedFilm[0];
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        "Erreur lors de la suppression du film dans la base de donnée",
      );
    }
  },

};

export default filmService;
