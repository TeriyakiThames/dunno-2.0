import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: users } = await supabase.from("users").select();

  return (
    <ul>
      {users?.map((user: any) => (
        <li key={user.id}>{user}</li>
      ))}
    </ul>
  );
}
