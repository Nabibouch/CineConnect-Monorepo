import { commentsTable } from "../db/schema.js";

export type CreateCommentInput = Omit<
  typeof commentsTable.$inferInsert,
  "id"
>;

export type UpdateCommentInput = Partial<CreateCommentInput>;
