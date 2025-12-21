// File: lib/atonm/guards/evaluate.ts
// Minimal guard evaluation – v1.3 (async, SafetyGate authoritative)

import { SafetyGate } from "../atonm/safety/SafetyGate";

export type GuardType =
  | "crisis"
  | "do_not"
  | "terminate"
  | "humor"
  | null;

export async function evaluateGuards(input: string): Promise<GuardType> {
  // --- ATONM v3.5 ---
  const safety = await SafetyGate.classify(input);

  if (safety.classification !== "SAFE") {
    switch (safety.classification) {
      case "CRISIS":
        return "crisis";

      case "DESTRUCTIVE":
      case "SEXUAL":
      case "ILLEGAL":
        return "do_not";

      case "UNKNOWN":
      default:
        return "terminate";
    }
  }
  // --- end v3.5 safety handling ---

  // Fallback keyword guards (unchanged semantics)
  const t = input.toLowerCase();

  if (
    t.includes("selvmord") ||
    t.includes("vil dø") ||
    t.includes("kan ikke leve")
  ) return "crisis";

  if (
    t.includes("lol") ||
    t.includes("haha") ||
    t.includes("bare for sjov") ||
    t.includes("test") ||
    t.includes("😉") ||
    t.includes("😂")
  ) return "humor";

  if (
    t.includes("porno") ||
    t.includes("sex") ||
    t.includes("ulovlig") ||
    t.includes("narko") ||
    t.includes("våben")
  ) return "do_not";

  if (
    t.includes("religion") ||
    t.includes("politik") ||
    t.includes("lgbt") ||
    t.includes("anbefal") ||
    t.includes("hvem er den bedste")
  ) return "terminate";

  return null;
}
