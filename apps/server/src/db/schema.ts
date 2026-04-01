import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow(),
  avatar_url: text(),
  bio: text(),
});

export const filmsTable = pgTable("films", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  poster_url: text(),
  author: varchar({ length: 255 }),
  language: varchar({ length: 255 }),
  trailer: text(),
  actors: varchar({ length: 255 }).array(),
  awards: varchar({ length: 255 }).array(),
  released_date: timestamp(),
  created_at: timestamp().defaultNow(),
  vote_average: real(),
  categories: varchar({ length: 255 }).array(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: text(),
  user_id: integer().references(() => usersTable.id, { onDelete: "set null" }),
  film_id: integer().references(() => filmsTable.id, { onDelete: "set null" }),
});

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  user_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  film_id: integer().references(() => filmsTable.id, { onDelete: "cascade" }),
  post_id: integer().references(() => postsTable.id, { onDelete: "cascade" }),
});

export const ratingsTable = pgTable("ratings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  film_id: integer()
    .references(() => filmsTable.id, { onDelete: "cascade" })
    .notNull(),
  rate: integer().notNull(),
});

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const categorizationTable = pgTable("categorization", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  film_id: integer()
    .references(() => filmsTable.id, { onDelete: "cascade" })
    .notNull(),
  category_id: integer()
    .references(() => categoriesTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const conversationsTable = pgTable("conversations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
});

export const conversationMembersTable = pgTable("conversation_members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversation_id: integer()
    .references(() => conversationsTable.id, { onDelete: "cascade" })
    .notNull(),
  user_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversation_id: integer()
    .references(() => conversationsTable.id, { onDelete: "cascade" })
    .notNull(),
  sender_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text().notNull(),
  created_at: timestamp().defaultNow(),
});

export const iconstable = pgTable("Icons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  icons: varchar(),
});

export const followsTable = pgTable("follows", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  follower_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  following_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp().defaultNow(),
});
