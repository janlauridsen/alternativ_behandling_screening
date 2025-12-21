// app/api/handoff-chat/route.ts
// Handoff LLM endpoint – guard-wired (v3.4)
// Status: non-advisory · guard-first · telemetry enabled

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

import { evaluateGuards } from "../../../lib/guards/evaluate";
import { respond } from "../../../lib/guards/respond";
import { track } from "../../../lib/telemetry";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Systemprompt
const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/atonm/runtime/system-prompt-v2.txt"),
  "utf8"
);

// Handoff-instruktion (kort, normativ)
const HANDOFF_INSTRUCTION = `
You are continuing a conversation after an ATONM orientation.

The user has completed a structured, non-diagnostic narrowing process.

You must:
- Start by briefly summarizing the orientation in neutral language.
- Mention remaining approaches descriptively, without recommending or prioritizing.
- Do not reopen narrowing or ask diagnostic questions.
- Do not give advice or promise outcomes.
- End with one open-ended question asking what the user would like to explore further.

This is an orientation handoff, not a treatment discussion.
`;

export async function POST(req: Request) {
  const body = await req.json();
  const { message, handoffContext } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  // ---------- GUARDS (v3.4) ----------
  const guard = evaluateGuards(message);

  if (guard) {
    track({
      name: "guard_triggered",
      timestamp: Date.now(),
      context: {
        version: "3.4",
        source: "public",
      },
      payload: { guard },
    });

    return NextResponse.json({
      reply: respond(guard),
    });
  }

  // ---------- LLM ----------
  const messages: { role: "system" | "user"; content: string }[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "system",
      content: HANDOFF_INSTRUCTION,
    },
  ];

  if (handoffContext) {
    messages.push({
      role: "system",
      content: `ATONM context:\n${JSON.stringify(handoffContext, null, 2)}`,
    });
  }

  messages.push({
    role: "user",
    content: message,
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
    temperature: 0.4,
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
