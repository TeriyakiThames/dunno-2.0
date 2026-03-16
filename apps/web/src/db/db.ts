import postgres from "postgres";
import { DrizzleConfig } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import createClient from "@/lib/supabase/server";
import { createDrizzle } from "./drizzle";

// import * as schema from "./schema";
import * as schema from "../../supabase/migrations/schema";

import { decode } from "./jwt";

const config = {
  casing: "snake_case",
  schema,
} satisfies DrizzleConfig<typeof schema>;

// https://github.com/orgs/supabase/discussions/23224
// Should be secure because we use the access token that is signed, and not the data read directly from the storage

// Node.js module caching - cache connections to avoid reconnecting on every request
let cachedAdmin: ReturnType<typeof drizzle> | null = null;
let cachedClient: ReturnType<typeof drizzle> | null = null;

export async function createDrizzleSupabaseClient() {
  // Bypass RLS
  if (!cachedAdmin) {
    cachedAdmin = drizzle({
      client: postgres(process.env.ADMIN_DATABASE_URL!, { prepare: false }), // postgres role
      ...config,
    });
  }

  // Protected by RLS
  if (!cachedClient) {
    cachedClient = drizzle({
      client: postgres(process.env.CLIENT_DATABASE_URL!, { prepare: false }), // create new role in database for this. GRANT anon & authenticated for the role.
      ...config,
    });
  }

  const {
    data: { session },
  } = await (await createClient()).auth.getSession();

  return createDrizzle(decode(session?.access_token ?? ""), {
    admin: cachedAdmin,
    client: cachedClient,
  });
}
