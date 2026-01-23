import db from "../db/index.js";
import { filmsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

type updateData = {
  title?: string;
  description?: string;
  release_date?: Date;
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
      const updatedFilm = await db
        .update(filmsTable)
        .set(data)
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
};

export default filmService;
