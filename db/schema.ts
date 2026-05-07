import { integer, pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar().notNull().unique(),
  token: text("token"),
});


export const accountTable = pgTable("account", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar().unique().notNull(),
  name: varchar().notNull(),

  userId: integer().notNull().references(() => usersTable.id)
});

export const videosTable = pgTable("videos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar(),
  link: varchar().notNull(),
  timestamp: timestamp().defaultNow().notNull(),

  playlistId: integer().references(() => playlistsTable.id),
  accountId: integer().notNull().references(() => accountTable.id),
});

export const visibleEnum = pgEnum("visible", ["public", "private"]);


export const playlistsTable = pgTable("playlists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar(),
  timestamp: timestamp().defaultNow().notNull(),
  visible: visibleEnum().notNull().default("private"),

  accountId: integer().notNull().references(() => accountTable.id)
});


