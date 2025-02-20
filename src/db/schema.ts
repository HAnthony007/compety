import { 
    pgTable, 
    serial, 
    text,  
    integer, 
    varchar, 
    timestamp 
  } from "drizzle-orm/pg-core";  
  
  export const usersTable = pgTable("users", {
      id_user: integer("id_user").primaryKey().generatedAlwaysAsIdentity(),
      email: varchar("email", { length: 255 }).unique().notNull(),
      password: varchar("password", { length: 255 }).notNull(),
      photo: varchar("photo", { length: 255 }),
      role: varchar("role", { length: 10 }).default('user').notNull(),
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
  
    created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull()
  });
  