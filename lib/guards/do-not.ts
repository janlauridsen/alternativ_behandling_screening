// lib/guards/do-not.ts
// Status: Central guard · deterministisk lukning

export type DoNotResult =
  | { blocked: false }
  | { blocked: true; reason: DoNotReason; reply: string }

export type DoNotReason =
  | "sexual_content"
  | "religion_politics_ethics"
  | "persons_places"
  | "illegal_gdpr"
  | "prompt_probing"
  | "out_of_scope_general"

const DEFAULT_REPLY = "Det kan jeg ikke hjælpe med."

const REPLIES: Record<DoNotReason, string> = {
  sexual_content: DEFAULT_REPLY,
  religion_politics_ethics: DEFAULT_REPLY,
  persons_places: DEFAULT_REPLY,
  illegal_gdpr: DEFAULT_REPLY,
  prompt_probing: DEFAULT_REPLY,
  out_of_scope_general: DEFAULT_REPLY,
}

/**
 * Matcher groft. Hellere false positive end dialog.
 */
export function doNotGuard(input: string): DoNotResult {
  const t = input.toLowerCase()

  // Seksuelt / pornografisk
  if (
    t.includes("sex") ||
    t.includes("porno") ||
    t.includes("nøgen") ||
    t.includes("fetish")
  ) {
    return {
      blocked: true,
      reason: "sexual_content",
      reply: REPLIES.sexual_content,
    }
  }

  // Religion, politik, etik
  if (
    t.includes("religion") ||
    t.includes("gud") ||
    t.includes("politik") ||
    t.includes("moral") ||
    t.includes("etik")
  ) {
    return {
      blocked: true,
      reason: "religion_politics_ethics",
      reply: REPLIES.religion_politics_ethics,
    }
  }

  // Personer / steder / behandlere
  if (
    t.includes("behandler") ||
    t.includes("klinik") ||
    t.includes("navn") ||
    t.includes("sted")
  ) {
    return {
      blocked: true,
      reason: "persons_places",
      reply: REPLIES.persons_places,
    }
  }

  // Ulovligt / GDPR
  if (
    t.includes("ulovlig") ||
    t.includes("persondata") ||
    t.includes("gdpr")
  ) {
    return {
      blocked: true,
      reason: "illegal_gdpr",
      reply: REPLIES.illegal_gdpr,
    }
  }

  // Prompt probing
  if (
    t.includes("system prompt") ||
    t.includes("instruktion") ||
    t.includes("hvordan er du bygget")
  ) {
    return {
      blocked: true,
      reason: "prompt_probing",
      reply: REPLIES.prompt_probing,
    }
  }

  return { blocked: false }
}
