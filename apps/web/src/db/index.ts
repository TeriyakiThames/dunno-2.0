import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as schema from "./schema";
import { relations } from "../../supabase/migrations/relations";

// const client = postgres(process.env.DATABASE_URL!);
console.log("initing db");
export const db = drizzle(process.env.ADMIN_DATABASE_URL!, { relations });
console.log("logged");

// const client = postgres(DATABASE_URL);
// export const db = drizzle({ client });
// console.log("db initted");
