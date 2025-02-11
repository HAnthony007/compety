import { integer, pgTable, varchar, vector } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    photo: varchar({ length: 255 }),
    role: varchar({ length: 10 }).default('user').notNull(),
    face: vector('face', {dimensions: 128}),
})