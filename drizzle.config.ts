import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_AjTkCcpM6mh1@ep-restless-math-ahtzjrx8-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
});
