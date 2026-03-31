import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { categoriesTable } from "../db/schema.js";
import { normalizeId } from "../utils/normalizeId.js";

type CategoryInput = {
  name?: string;
};

type UpdateCategoryInput = Partial<CategoryInput>;

const categoryService = {
  async createCategory(data: CategoryInput) {
    try {
      if (!data.name) {
        throw new Error("Le nom est requis");
      }

      const [category] = await db
        .insert(categoriesTable)
        .values({ name: data.name })
        .returning();

      return category;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la creation de la categorie");
    }
  },

  async findAllCategories() {
    try {
      const categories = await db.select().from(categoriesTable);
      return categories;
    } catch (error) {
      throw new Error("Erreur lors de la recuperation des categories");
    }
  },

  async findCategoryById(id: string) {
    try {
      const categoryId = normalizeId(id);
      const [category] = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, categoryId))
        .limit(1);

      if (!category) {
        throw new Error(
          `Aucune categorie avec l'id ${categoryId} n'a ete trouvee`,
        );
      }

      return category;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la recuperation de la categorie");
    }
  },

  async updateById(id: string, data: UpdateCategoryInput) {
    const categoryId = normalizeId(id);

    if (!Object.keys(data).length) {
      throw new Error("Aucune donnee envoyee");
    }

    // On evite de pousser des champs `undefined` dans la requete SQL.
    const dataToUpdate: { name?: string } = {};
    if (data.name !== undefined) {
      if (!data.name) {
        throw new Error("Le nom ne peut pas etre vide");
      }
      dataToUpdate.name = data.name;
    }

    if (!Object.keys(dataToUpdate).length) {
      throw new Error("Aucune donnee valide envoyee");
    }

    const updated = await db
      .update(categoriesTable)
      .set(dataToUpdate)
      .where(eq(categoriesTable.id, categoryId))
      .returning();

    if (!updated.length) {
      throw new Error(`Aucune categorie avec l'id ${id} n'a ete trouvee`);
    }

    return updated[0];
  },

  async removeById(id: string) {
    try {
      const categoryId = normalizeId(id);
      const [deleted] = await db
        .delete(categoriesTable)
        .where(eq(categoriesTable.id, categoryId))
        .returning();

      if (!deleted) {
        throw new Error(
          `Aucune categorie avec l'id ${categoryId} n'a ete trouvee`,
        );
      }

      return deleted;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Erreur lors de la suppression de la categorie");
    }
  },
};

export default categoryService;
