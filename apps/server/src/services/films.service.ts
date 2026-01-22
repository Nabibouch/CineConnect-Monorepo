import db from "../db/index.js";
import { filmsTable } from "../db/schema.js";

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
};

export default filmService;
