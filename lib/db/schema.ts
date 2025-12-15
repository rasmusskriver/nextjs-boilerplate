import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cvs = pgTable('cvs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  userEmail: text('user_email').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileName: text('file_name').notNull(),
  fileSize: text('file_size').notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

export type CV = typeof cvs.$inferSelect;
export type NewCV = typeof cvs.$inferInsert;
