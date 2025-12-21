// File: lib/atonm/safety/SafetyGate.ts
// ATONM v3.5 – SafetyGate (Trin 1: struktur, ingen AI endnu)

export type SafetyClassification =
  | "SAFE"
  | "CRISIS"
  | "DESTRUCTIVE"
  | "SEXUAL"
  | "ILLEGAL"
  | "UNKNOWN"

export type SafetyResult = {
  classification: SafetyClassification
  reason?: string // internal only, never exposed, never used for branching
}

export class SafetyGate {
  /**
   * Central safety classifier.
   *
   * IMPORTANT (Trin 1):
   * - No AI calls yet
   * - Always returns SAFE
   * - Exists only to lock contract and future wiring
   */
  static classify(input: string): SafetyResult {
    // Structural pre-check only (no behavior change yet)
    if (typeof input !== "string") {
      return {
        classification: "UNKNOWN",
        reason: "non-string input"
      }
    }

    // NOTE:
    // Empty / whitespace handling is intentionally deferred
    // until Trin 3 to avoid any behavior change in this step.

    return {
      classification: "SAFE"
    }
  }
}
