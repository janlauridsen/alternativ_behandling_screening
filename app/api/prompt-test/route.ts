// app/api/prompt-test/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

import { evaluateGuards } from "../../../lib/atonm/guards/evaluate";
import { respond } from "../../../lib/atonm/guards/respond";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/atonm/runtime/system-prompt-v2.txt"),
  "utf8"
);

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  // ---------- INPUT GUARDS (v3.5) ----------
  const guard = await evaluateGuards(message);

  if (guard) {
    return NextResponse.json({
      reply: respond(guard),
    });
  }

  // ---------- LLM ----------
  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
  });

  // ---------- OUTPUT SAFETY (v3.5) ----------
  const reply = completion.choices[0].message.content ?? "";

  const outputGuard = await evaluateGuards(reply);

  if (outputGuard) {
    return NextResponse.json({
      reply: respond(outputGuard),
    });
  }

  return NextResponse.json({ reply });
}
