import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow(),
});

export const filmsTable = pgTable("films", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  user_id: integer().references(() => usersTable.id),
  film_id: integer().references(() => filmsTable.id),
});

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  user_id: integer()
    .references(() => usersTable.id)
    .notNull(),
  film_id: integer().references(() => filmsTable.id),
  post_id: integer().references(() => postsTable.id),
});

export const ratingsTable = pgTable("ratings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .references(() => usersTable.id)
    .notNull(),
  movie_id: integer()
    .references(() => filmsTable.id)
    .notNull(),
  rate: integer().notNull(),
});
