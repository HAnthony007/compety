import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id_user: integer("id_user").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  photo: varchar("photo", { length: 255 }),
  role: varchar("role", { length: 10 }).default("user").notNull(),
});

export const messagesTable = pgTable("messages", {
  id_msg: serial("id_msg").primaryKey(),
  text: varchar("text", { length: 1000 }).notNull(),

  sender_id: integer("sender_id")
    .notNull()
    .references(() => usersTable.id_user, { onDelete: "cascade" }),

  receveur_id: integer("receveur_id")
    .notNull()
    .references(() => usersTable.id_user, { onDelete: "cascade" }),

  status: varchar("status", { length: 20 }).default("sent").notNull(),

  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// Table des groupes
export const groupesTable = pgTable("groupes", {
  id_group: serial("id_group").primaryKey(),
  nom: varchar("nom", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// Table de relation pour les membres d'un groupe
export const groupMembersTable = pgTable(
  "group_members",
  {
    group_id: integer("group_id")
      .notNull()
      .references(() => groupesTable.id_group, { onDelete: "restrict" }),
    user_id: integer("user_id")
      .notNull()
      .references(() => usersTable.id_user, { onDelete: "restrict" }),
    role: varchar("role", { length: 50 }).default("member").notNull(),
    joined_at: timestamp("joined_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey(table.group_id, table.user_id),
  })
);

// Table des messages de groupe
export const groupMessagesTable = pgTable("group_messages", {
  id_msg: serial("id_msg").primaryKey(),
  text: varchar("text", { length: 1000 }).notNull(),
  sender_id: integer("sender_id")
    .notNull()
    .references(() => usersTable.id_user, { onDelete: "restrict" }),
  group_id: integer("group_id")
    .notNull()
    .references(() => groupesTable.id_group, { onDelete: "cascade" }),

  status: varchar("status", { length: 20 }).default("sent").notNull(), // ✅ Ajout du statut

  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  image_url: varchar("image_url", { length: 500 }),
  audio_url: varchar("audio_url", { length: 500 }),
});
