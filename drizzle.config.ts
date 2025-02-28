import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,
    url: "postgres://postgres:123@localhost:5432/Projet_equipe",
  },
});
