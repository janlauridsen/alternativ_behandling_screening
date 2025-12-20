// lib/atonm/renderProfileText.ts
// Status: Ren render-funktion · ingen beslutningslogik

import type { HypotheticalUserProfile } from "../../data/atonm/profile.schema"

export function renderHypotheticalProfileText(
  profile: HypotheticalUserProfile
): string[] {
  const paragraphs: string[] = []

  const experienceText =
    profile.experienceOrientation === "body"
      ? "kropsligt"
      : profile.experienceOrientation === "mind"
      ? "mentalt"
      : profile.experienceOrientation === "mixed"
      ? "både kropsligt og mentalt"
      : "svært at afgrænse"

  const situationText =
    profile.situationPattern === "situational"
      ? "knyttet til en situation"
      : profile.situationPattern === "recurring"
      ? "noget der vender tilbage"
      : "noget der har stået på i længere tid"

  const participationText =
    profile.participationPreference === "active"
      ? "aktivt"
      : profile.participationPreference === "passive"
      ? "mere modtagende"
      : "på forskellige måder"

  const guidanceText =
    profile.guidancePreference === "guided"
      ? "tydelig guidning"
      : profile.guidancePreference === "self_directed"
      ? "selv at styre processen"
      : "en delt form for styring"

  const abstractionText =
    profile.abstractionTolerance === "low"
      ? "en konkret og jordnær"
      : profile.abstractionTolerance === "high"
      ? "en mere fortolkende eller abstrakt"
      : "en både konkret og fortolkende"

  paragraphs.push(
    `Ud fra dine svar tegner der sig et billede af en situation, som opleves som ${experienceText}, og som har karakter af ${situationText}. ` +
      `Du beskriver en præference for at deltage ${participationText} og med en grad af styring, der kan beskrives som ${guidanceText}. ` +
      `Samtidig virker ${abstractionText} ramme mest genkendelig for dig.`
  )

  return paragraphs
}
