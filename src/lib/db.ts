import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../../drizzle/schema";

const connectionString = process.env.DATABASE_URL;

export const db =
  connectionString && connectionString.length > 0
    ? drizzle(neon(connectionString), { schema })
    : null;

export type Database = NonNullable<typeof db>;

export { schema };
