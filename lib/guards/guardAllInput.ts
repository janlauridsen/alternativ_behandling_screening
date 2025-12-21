// lib/guards/guardAllInput.ts
// Global, permanent input safety barrier for ATONM v3.5+

import { evaluateGuards } from "./evaluate";
import { respond } from "./respond";

/**
 * Scans ALL string values in a request body.
 * If ANY string triggers a guard → stop immediately.
 *
 * This is field-agnostic by design.
 */
export async function guardAllInput(body: unknown) {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  for (const value of Object.values(body)) {
    if (typeof value === "string") {
      const guard = await evaluateGuards(value);
      if (guard) {
        return respond(guard);
      }
    }
  }

  return null;
}
