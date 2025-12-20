// lib/atonm/renderMethodText.ts
// Status: Ren render-funktion · ingen beslutningslogik

export type TypeAMethod = {
  experienceOrientation: "body" | "mind" | "mixed" | "abstract"
  interactionForm: "passive" | "active" | "mixed" | "dialog"
  guidanceLevel: "practitioner_led" | "shared" | "self_directed"
  abstractionLevel: "concrete" | "mixed" | "interpretive"
  structuringDegree: "fixed" | "semi_structured" | "open"
  practitionerDependency: "low" | "medium" | "high"
  temporalStructure: "bounded" | "recurring" | "ongoing"
  physicalContact: "none" | "light" | "direct"
}

export function renderMethodText(
  methodName: string,
  method: TypeAMethod
): string[] {
  const paragraphs: string[] = []

  const experienceText =
    method.experienceOrientation === "body"
      ? "kropsligt"
      : method.experienceOrientation === "mind"
      ? "mentalt"
      : method.experienceOrientation === "mixed"
      ? "både kropsligt og mentalt"
      : "fortolkende eller abstrakt"

  const interactionText =
    method.interactionForm === "passive"
      ? "primært passiv"
      : method.interactionForm === "active"
      ? "primært aktiv"
      : method.interactionForm === "dialog"
      ? "dialogbaseret"
      : "kombineret"

  const guidanceText =
    method.guidanceLevel === "practitioner_led"
      ? "primært behandlerstyret"
      : method.guidanceLevel === "self_directed"
      ? "selvstyret"
      : "delt ansvar"

  const abstractionText =
    method.abstractionLevel === "concrete"
      ? "overvejende konkret"
      : method.abstractionLevel === "interpretive"
      ? "overvejende fortolkende"
      : "blandet"

  const structuringText =
    method.structuringDegree === "fixed"
      ? "fast"
      : method.structuringDegree === "open"
      ? "åben"
      : "delvist struktureret"

  const temporalText =
    method.temporalStructure === "bounded"
      ? "et afgrænset forløb"
      : method.temporalStructure === "ongoing"
      ? "en løbende praksis"
      : "noget der gentages over tid"

  const contactText =
    method.physicalContact === "none"
      ? "ingen"
      : method.physicalContact === "light"
      ? "let"
      : "direkte"

  paragraphs.push(
    `${methodName} beskrives som en tilgang, der primært arbejder med ${experienceText}.`
  )

  paragraphs.push(
    `Deltagelsen er typisk ${interactionText}, og forløbet er overvejende ${guidanceText}.`
  )

  paragraphs.push(
    `Rammen opleves ofte som ${abstractionText} og ${structuringText}.`
  )

  paragraphs.push(
    `Forløbet omtales typisk som ${temporalText}.`
  )

  paragraphs.push(
    `Der indgår ${contactText} fysisk berøring.`
  )

  return paragraphs
}
