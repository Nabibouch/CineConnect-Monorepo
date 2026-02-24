import db from "../db/index.js";
import { filmsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

type updateData = {
  title?: string;
  description?: string;
  release_date?: Date | string;
};

const filmService = {
  async createFilm(data: { title: string; description: string }) {
    try {
      if (!data.title || !data.description)
        throw new Error("Tout les champs doivent être remplis");

      const [film] = await db.insert(filmsTable).values(data).returning();
      return film;
    } catch (error) {
      throw new Error("Erreur inconnue");
    }
  },

  async findAllFilms() {
    try {
      const listFilms = await db.select().from(filmsTable);
      return listFilms;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des films");
    }
  },

  async updateById(id: string, data: updateData) {
    try {
      const filmId = Number(id);
      if (isNaN(filmId)) throw new Error("L'id n'est pas valide");

      if (!Object.keys(data).length) {
        throw new Error("Aucune donnée envoyé");
      }

      const dataToUpdate: Partial<typeof filmsTable.$inferInsert> = {
         ...(data.title && { title: data.title }),
         ...(data.description && { description: data.description }),
         ...(data.release_date && { release_date: new Date(data.release_date) }),
       };

      const updatedFilm = await db
        .update(filmsTable)
        .set(dataToUpdate)
        .where(eq(filmsTable.id, filmId))
        .returning();

      if (!updatedFilm.length) {
        throw new Error(`Aucun film avec l'id ${id} n'a été trouvé`);
      }

      return updatedFilm[0];
    } catch (error) {
      throw new Error("Erreur lors de la modification dans la base de donnée");
    }
  },
  async removeById(id: string) {
    try {
      const filmId = Number(id);
      if (isNaN(filmId)) {
        throw new Error("L'id n'est pas valide");
      }
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

  async findFilmById(id: string) {
    try {
      const filmId = Number(id);
      if (isNaN(filmId)) {
        throw new Error("L'id n'est pas valide");
      }
      const film = await db
        .select()
        .from(filmsTable)
        .where(eq(filmsTable.id, filmId))
        .limit(1);
      if (!film.length) {
        throw new Error(`Aucun film avec l'id ${filmId} n'a été trouvé`);
      }
      return film[0];
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la récupération dans la base de données");
    }
  },
};

export default filmService;
