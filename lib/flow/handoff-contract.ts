// lib/flow/handoff-contract.ts
// Status: Handoff-kontrakt · ingen runtime-LLM

import type { ATONMState } from "../state"

export type LLMHandoffSnapshot = {
  phase: "handoff"
  intakeText?: string
  answers?: Record<string, string>
  profile?: unknown
  remainingTreatments?: string[]
}

/**
 * Hvad LLM må se.
 * Ingen mutation. Ingen genberegning.
 */
export function buildLLMHandoffSnapshot(
  state: ATONMState
): LLMHandoffSnapshot {
  return {
    phase: "handoff",
    intakeText: state.intakeText,
    answers: state.answers,
    profile: state.profile,
    remainingTreatments: state.remainingTreatments,
  }
}
