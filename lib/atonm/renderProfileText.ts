// lib/atonm/renderProfileText.ts
// Status: Ren render-funktion · med spejling af intake

import type { HypotheticalUserProfile } from "./profile.schema";

export function renderHypotheticalProfileText(
  profile: HypotheticalUserProfile,
  intakeText?: string
): string[] {
  const lines: string[] = [];

  if (intakeText) {
    lines.push(
      `Du beskrev indledningsvis, at ${intakeText.trim()}.`
    );
  }

  lines.push(
    `Samlet set peger dine svar på, at du typisk oplever situationer på en ${profile.experienceOrientation} måde.`
  );

  lines.push(
    `Forløb som dette beskrives oftest som ${profile.situationPattern.replace(
      "_",
      " "
    )}.`
  );

  lines.push(
    `Du foretrækker typisk en ${
      profile.participationPreference === "active"
        ? "aktiv"
        : profile.participationPreference === "passive"
        ? "mere modtagende"
        : "afbalanceret"
    } rolle i processen.`
  );

  lines.push(
    `Forklaringsrammer opleves for dig som ${
      profile.abstractionTolerance === "high"
        ? "vigtige"
        : profile.abstractionTolerance === "low"
        ? "mindre vigtige"
        : "relevante, men ikke afgørende"
    }.`
  );

  return lines;
}
