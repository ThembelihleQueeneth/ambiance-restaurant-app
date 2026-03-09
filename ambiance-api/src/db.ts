// import { Pool } from "pg";

// export const pool = new Pool(
//   process.env.DATABASE_URL
//     ? { connectionString: process.env.DATABASE_URL }
//     : {
//       user: "postgres",
//       host: "localhost",
//       database: "ambiance_db",
//       password: "12345",
//       port: 5432,
//     }
// );
// db.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY! // service role key
);
