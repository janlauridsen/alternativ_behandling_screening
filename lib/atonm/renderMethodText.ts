// lib/atonm/renderMethodText.ts
// Status: Metodebeskrivelse · sproglig oprydning · ikke-rådgivende

import type { Treatment } from "../../app/api/atonm-test/loadTreatments";

export function renderMethodText(
  id: string,
  method: Treatment
): string[] {
  const lines: string[] = [];

  lines.push(
    `${id} beskrives som en tilgang, der overvejende arbejder ${
      method.experienceOrientation === "body"
        ? "kropsligt"
        : method.experienceOrientation === "mind"
        ? "mentalt"
        : method.experienceOrientation === "mixed"
        ? "både kropsligt og mentalt"
        : "med mere abstrakte oplevelser"
    }.`
  );

  lines.push(
    `Deltagelsen er typisk ${
      method.interactionForm === "passive"
        ? "overvejende modtagende"
        : method.interactionForm === "active"
        ? "aktiv"
        : "kombineret"
    }, og forløbet er som regel ${
      method.guidanceLevel === "practitioner_led"
        ? "behandlerstyret"
        : method.guidanceLevel === "shared"
        ? "delt"
        : "selvstyret"
    }.`
  );

  lines.push(
    `Rammen opleves ofte som ${
      method.abstractionLevel === "concrete"
        ? "konkret"
        : method.abstractionLevel === "interpretive"
        ? "fortolkende"
        : "blandet"
    } og ${
      method.structuringDegree === "fixed"
        ? "fast"
        : method.structuringDegree === "semi_structured"
        ? "delvist struktureret"
        : "åben"
    }.`
  );

  lines.push(
    `Forløbet omtales typisk som ${
      method.temporalStructure === "recurring"
        ? "noget der gentages over tid"
        : method.temporalStructure === "ongoing"
        ? "løbende"
        : "afgrænset i tid"
    }.`
  );

  if (method.physicalContact !== "none") {
    lines.push(
      `Der indgår ${
        method.physicalContact === "direct"
          ? "direkte"
          : "let"
      } fysisk berøring.`
    );
  }

  return lines;
}
