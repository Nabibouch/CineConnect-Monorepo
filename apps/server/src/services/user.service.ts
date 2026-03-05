import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import argon2 from "argon2";
import { normalizeId } from "../utils/normalizeId.js";
import { UserInput } from "../utils/userInput.js";

const userService = {
  async createUser(data: UserInput) {
    if (!data.username || !data.email || !data.password) {
      throw new Error("Tout les champs doivent être remplis");
    }

    const existingUser = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
      .limit(1);

    if (existingUser.length) {
      throw new Error("Email déjà utilisé par un autre utilisateur");
    }

    if (data.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 charactères");
    }

    const hashedPassword = await argon2.hash(data.password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
    const [user] = await db
      .insert(usersTable)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning();

    return user;
  },

  async findAllUsers() {
    try {
      const listUsers = await db
        .select({
          id: usersTable.id,
          username: usersTable.username,
        })
        .from(usersTable);

      return listUsers;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
  },

  async findUserById(id: string) {
    try {
      const userId = normalizeId(id, "L'id est incorrect");

      const [user] = await db
        .select({
          id: usersTable.id,
          username: usersTable.username,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      return user;
    } catch (error) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
  },

  async connexion(data: { email: string; password: string }) {
    try {
      if (!data.email || !data.password) {
        throw new Error("Tout les champs doivent être remplis");
      }

      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, data.email))
        .limit(1);

      if (!user.length) throw new Error("Identifiant incorrects");

      const passwordCheck = await argon2.verify(
        user[0].password,
        data.password,
      );
      if (!passwordCheck) {
        throw new Error("Mot de passe incorrect");
      }

      const { password, ...userWithoutPassword } = user[0];

      return userWithoutPassword;
    } catch (error) {
      throw new Error("Erreur server");
    }
  },

  async updateById(data: UserInput, id: string) {
    try {
      const userId = normalizeId(id, "Id n'est pas valide");

      const updatedUser = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, userId))
        .returning();

      if (!updatedUser.length)
        throw new Error(
          `Aucun utilisateur avec l'id ${userId} n'as été trouvé`,
        );
      return updatedUser[0];
    } catch (error) {
      throw new Error("Erreur lors de la modification dans la base de donnée");
    }
  },

  async removeById(id: string) {
    try {
      const userId = normalizeId(id);
      const deletedUser = await db
        .delete(usersTable)
        .where(eq(usersTable.id, userId))
        .returning();
      if (!deletedUser.length) {
        throw new Error(
          `Aucun utilisateur avec l'id ${userId} n'as été trouvé`,
        );
      }
      return deletedUser[0];
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        "Erreur lors de la suppression de l'utilisateur dans la base de donnée",
      );
    }
  },
};

export default userService;
