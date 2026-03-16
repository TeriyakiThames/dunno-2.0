import createClient from "@/lib/supabase/server";

import { createDrizzleSupabaseClient } from "@/db/db";
import { user } from "../../../../supabase/migrations/schema";

import { SelectUser, userTable } from "@/db/schema";
import { db } from "@/db/index";

export default async function Page() {
  // Approach 1: use Supabase's JS client library
  // RLS enabled by default
  const supabase = await createClient();
  const { data: users1 } = await supabase.from("user").select();

  // Approach 2: Drizzle with RLS -- adapted from https://github.com/rphlmr/drizzle-supabase-rls
  // Slow, and cannot use Drizzle Queries v2
  const dbWithRls = await createDrizzleSupabaseClient();
  const users2 = await dbWithRls.rls((tx) => tx.select().from(user));

  // Approach 3 & 4: Drizzle's query builder (top) and Drizzle Queries (bottom)
  // Fastest, but no RLS
  const users3 = await db.select().from(userTable);
  const users4 = await db.query.user.findMany();

  return (
    <div className="m-4">
      <h2>1: From Supabase JS client library</h2>
      <ul>
        {users1?.map((user) => (
          <li key={user.id}>
            {user.username} {user.id}
          </li>
        ))}
      </ul>
      <p>-------------------------</p>
      <h2>2: From Drizzle with RLS</h2>
      <ul>
        {users2.map((user: SelectUser) => (
          <li key={user.id}>
            {user.username} {user.id}
          </li>
        ))}
      </ul>
      <p>-------------------------</p>
      <h2>3: From Drizzle query builder (no RLS)</h2>
      <ul>
        {users3.map((user) => (
          <li key={user.id}>
            {user.username} {user.id}
          </li>
        ))}
      </ul>
      <p>-------------------------</p>
      <h2>4: From Drizzle Queries (no RLS)</h2>
      <ul>
        {users4.map((user) => (
          <li key={user.id}>
            {user.username} {user.id}
          </li>
        ))}
      </ul>
      <p>-------------------------</p>
    </div>
  );
}
