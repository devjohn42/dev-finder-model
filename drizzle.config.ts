import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be configured.')
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: 'src/db/migrations',
  casing: 'snake_case'
})
