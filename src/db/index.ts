// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be configured.')
}

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient, schema, casing: 'snake_case' });

export { db }
