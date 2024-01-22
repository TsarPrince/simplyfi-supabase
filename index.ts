import express from "express";
import dotenv from "dotenv";

import { sendEmail } from "./utils/sendEmail";
import { supabase, supabaseAdmin } from "./lib";
import { Tables } from "./types/database.types";

dotenv.config();

const app = express();
app.use(express.json());

supabase
  .channel("custom-all-channels")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "poll",
    },
    async (payload) => {
      const poll = payload.new as Tables<"poll">;

      const {
        data: { users },
        error,
      } = await supabaseAdmin.auth.admin.listUsers();

      users
        .map((user) => user.email)
        .forEach((email) => {
          if (!email) return;

          const text = `New poll is live: ${poll.title}`;
          sendEmail(
            email,
            "Update from Simplyfi.ai!",
            text,
            `<h1>${text}</h1><a href="https://simplyfi-beta.vercel.app/">Cast your Vote Now!</a>`
          );
        });
    }
  )
  .subscribe();

app.get("/", async (req, res) => {
  return res.status(200).json({
    status: "SUCCESS",
    message: "pub/sub mechanism for Simplyfi.ai notifications",
  });
});

app.listen(3000, () => {
  console.log("🚀 server at http://localhost:3000");
});
