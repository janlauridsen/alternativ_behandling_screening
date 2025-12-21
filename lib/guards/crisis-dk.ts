// lib/guards/crisis-dk.ts
// Status: Krise & akut-respons · DK · deterministisk

export type CrisisResult =
  | { crisis: false }
  | { crisis: true; reply: string }

const CRISIS_REPLY = `
Det lyder som en akut situation.

Hvis der er fare for liv eller alvorlig skade:
Ring 112 med det samme.

Hvis du har brug for at tale med nogen nu:
- Livslinien: 70 201 201 (døgnåben)
- Børnetelefonen (for børn og unge): 116 111
- Psykiatrisk akutmodtagelse: kontakt via egen læge eller lægevagt 1813

Jeg kan ikke hjælpe yderligere her.
`.trim()

/**
 * Grov match. Hellere false positive end at overse.
 */
export function crisisGuardDK(input: string): CrisisResult {
  const t = input.toLowerCase()

  if (
    t.includes("selvmord") ||
    t.includes("tage mit liv") ||
    t.includes("vil dø") ||
    t.includes("skære mig") ||
    t.includes("kan ikke mere") ||
    t.includes("akut") ||
    t.includes("panik") ||
    t.includes("overdosis")
  ) {
    return {
      crisis: true,
      reply: CRISIS_REPLY,
    }
  }

  return { crisis: false }
}
