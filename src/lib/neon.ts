import "server-only";

import { neon } from "@neondatabase/serverless";

let schemaPromise: Promise<void> | undefined;

export function neonConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function database() {
  const connectionString = process.env.DATABASE_URL;
  return connectionString ? neon(connectionString) : null;
}

/** Creates the small persistence layer used by reviews and the clinic dashboard. */
export async function ensureNeonSchema() {
  const sql = database();
  if (!sql) return null;

  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS injectox_site_content (
          id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
          content JSONB NOT NULL DEFAULT '{}'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS injectox_reviews (
          id TEXT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          treatment VARCHAR(100) NOT NULL,
          review VARCHAR(1500) NOT NULL,
          rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
          consent BOOLEAN NOT NULL,
          status VARCHAR(16) NOT NULL CHECK (status IN ('pending', 'approved', 'dismissed')),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS injectox_reviews_created_at_idx ON injectox_reviews (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS injectox_reviews_status_idx ON injectox_reviews (status)`;
      await sql`
        CREATE TABLE IF NOT EXISTS injectox_rate_limits (
          key TEXT PRIMARY KEY,
          count INTEGER NOT NULL,
          reset_at TIMESTAMPTZ NOT NULL
        )
      `;
    })().catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }

  await schemaPromise;
  return sql;
}
