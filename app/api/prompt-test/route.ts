import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptPath = path.join(
  process.cwd(),
  "docs/runtime/system-prompt-v1.txt"
);

const SYSTEM_PROMPT = fs.readFileSync(promptPath, "utf8");

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    temperature: 0.4,
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
