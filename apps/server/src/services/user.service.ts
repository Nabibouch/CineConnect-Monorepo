import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { followsTable, usersTable } from "../db/schema.js";
import argon2 from "argon2";
import { normalizeId } from "../utils/normalizeId.js";
import { SignUpInput, SignInInput } from "../utils/userSchema.js";
import { UserInput } from "../utils/userInput.js";

const userService = {
  async createUser(data: SignUpInput) {
    // 👇 Plus besoin de vérifier les champs vides ni la longueur du password
    const existingUser = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
      .limit(1);

    if (existingUser.length) {
      throw new Error("Email déjà utilisé par un autre utilisateur");
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

  async findUserById(id: string) {
    try {
      const userId = normalizeId(id, "L'id est incorrect");

      const [user] = await db
        .select({
          id: usersTable.id,
          username: usersTable.username,
          avatar_url: usersTable.avatar_url,
          bio: usersTable.bio,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      // throw new Error("Erreur lors de la récupération de l'utilisateur par email");
    }
  },

  async connexion(data: SignInInput) {
    // 👇 Plus besoin de vérifier les champs vides
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
      .limit(1);

    if (!user.length) throw new Error("Identifiants incorrects");

    const passwordCheck = await argon2.verify(user[0].password, data.password);
    if (!passwordCheck) throw new Error("Mot de passe incorrect");

    const { password, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  },

  async findAllUsers() {
    try {
      const listUsers = await db
        .select({
          id: usersTable.id,
          username: usersTable.username,
          avatar_url: usersTable.avatar_url,
          bio: usersTable.bio,
        })
        .from(usersTable);

      return listUsers;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
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

  async findPrivateUserById(id: number) {
    const [user] = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        avatar_url: usersTable.avatar_url,
        bio: usersTable.bio,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    return user;
  },

  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error("Vous ne pouvez pas vous suivre vous-meme");
    }

    const existing = await db
      .select({ id: followsTable.id })
      .from(followsTable)
      .where(
        and(
          eq(followsTable.follower_id, followerId),
          eq(followsTable.following_id, followingId),
        ),
      )
      .limit(1);

    if (existing.length) {
      return { alreadyFollowing: true };
    }

    await db.insert(followsTable).values({
      follower_id: followerId,
      following_id: followingId,
    });

    return { alreadyFollowing: false };
  },

  async unfollowUser(followerId: number, followingId: number) {
    await db
      .delete(followsTable)
      .where(
        and(
          eq(followsTable.follower_id, followerId),
          eq(followsTable.following_id, followingId),
        ),
      );
  },

  async getFollowStatus(followerId: number, followingId: number) {
    const existing = await db
      .select({ id: followsTable.id })
      .from(followsTable)
      .where(
        and(
          eq(followsTable.follower_id, followerId),
          eq(followsTable.following_id, followingId),
        ),
      )
      .limit(1);

    return { isFollowing: existing.length > 0 };
  },

  async getFollowCounts(userId: number) {
    const followers = await db
      .select({ id: followsTable.id })
      .from(followsTable)
      .where(eq(followsTable.following_id, userId));

    const following = await db
      .select({ id: followsTable.id })
      .from(followsTable)
      .where(eq(followsTable.follower_id, userId));

    return { followers: followers.length, following: following.length };
  },
};



export default userService;