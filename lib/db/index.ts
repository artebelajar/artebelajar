import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// Untuk query
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

// Untuk migrations (opsional)
export const migrationClient = postgres(connectionString, { max: 1 })