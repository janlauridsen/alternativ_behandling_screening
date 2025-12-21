// lib/atonm/renderProfileText.ts
// Status: Ren render-funktion · sproglig normalisering

import type { HypotheticalUserProfile } from "./profile.schema";

export function renderHypotheticalProfileText(
  profile: HypotheticalUserProfile
): string[] {
  const lines: string[] = [];

  lines.push(
    `Du oplever det, du står i, som overvejende ${profile.experienceOrientation}.`
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
    `Du hælder mod en ${
      profile.guidancePreference === "guided"
        ? "guidet"
        : profile.guidancePreference === "self_directed"
        ? "selvstyrende"
        : "delt"
    } tilgang.`
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
