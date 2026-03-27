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
  avatar_url: text()
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
  vote_average: real()
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
  film_id: integer()
    .references(() => filmsTable.id)
    .notNull(),
  rate: integer().notNull(),
});

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique()
});

export const categorizationTable = pgTable("categorization", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  film_id: integer()
    .references(() => filmsTable.id)
    .notNull(),
  category_id: integer()
    .references(() => categoriesTable.id)
    .notNull(),
});

export const conversationsTable = pgTable("conversations", {
  id:         integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
});

export const conversationMembersTable = pgTable("conversation_members", {
  id:              integer().primaryKey().generatedAlwaysAsIdentity(),
  conversation_id: integer().references(() => conversationsTable.id).notNull(),
  user_id:         integer().references(() => usersTable.id).notNull(),
});

export const messagesTable = pgTable("messages", {
  id:              integer().primaryKey().generatedAlwaysAsIdentity(),
  conversation_id: integer().references(() => conversationsTable.id).notNull(),
  sender_id:       integer().references(() => usersTable.id).notNull(),
  content:         text().notNull(),
  created_at:      timestamp().defaultNow(),
});

export const iconstable = pgTable("Icons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  icons: varchar(),
})