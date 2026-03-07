import { pgTable, serial, text, integer, timestamp, index } from 'drizzle-orm/pg-core'

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull(),
  name: text('name').notNull(),
  text: text('text').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table) => {
  return {
    projectIdx: index('project_idx').on(table.projectId),
    timestampIdx: index('timestamp_idx').on(table.timestamp),
  }
})

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert