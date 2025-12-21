// lib/debug/debug-gate.ts
// Status: Intention-only gate · ingen sikkerhed

export type DebugGateStatus = "enabled" | "disabled"

/**
 * Debug UI er udelukkende til intern brug.
 * Denne gate er en arkitektonisk markør – ikke sikkerhed.
 */
export const DEBUG_GATE: DebugGateStatus =
  process.env.NODE_ENV === "development"
    ? "enabled"
    : "disabled"
