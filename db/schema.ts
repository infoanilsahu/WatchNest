import { integer, pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar().notNull().unique(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: integer("token_expires_at"),
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

const visibleEnum = pgEnum("visible", ["public", "private"]);


export const playlistsTable = pgTable("playlists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar(),
  timestamp: timestamp().defaultNow().notNull(),
  visble: visibleEnum().notNull().default("private"),

  accountId: integer().notNull().references(() => accountTable.id)
});


