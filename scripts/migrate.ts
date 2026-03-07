// src/scripts/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

async function main() {
  console.log('🔄 Migrating database...')
  
  // Untuk migrasi, kita perlu client dengan koneksi khusus
  const migrationClient = postgres(connectionString, { max: 1 })
  const db = drizzle(migrationClient)
  
  try {
    await migrate(db, { migrationsFolder: './lib/db/migrations' })
    console.log('✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await migrationClient.end()
    process.exit(0)
  }
}

main()