import { postsTable } from "../db/schema.js";

export type CreatePostInput = Omit<typeof postsTable.$inferInsert, "id">;

export type UpdatePostInput = Partial<CreatePostInput>;