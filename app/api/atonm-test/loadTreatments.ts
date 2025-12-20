import fs from "fs";
import path from "path";
import YAML from "yaml";

// Type A v3.1 – runtime shape
export type Treatment = {
  id: string;
  experienceOrientation: "body" | "mind" | "mixed" | "abstract";
  interactionForm: "passive" | "active" | "mixed" | "dialog";
  guidanceLevel: "practitioner_led" | "shared" | "self_directed";
  abstractionLevel: "concrete" | "mixed" | "interpretive";
  structuringDegree: "fixed" | "semi_structured" | "open";
  practitionerDependency: "low" | "medium" | "high";
  temporalStructure: "bounded" | "recurring" | "ongoing";
  physicalContact: "none" | "light" | "direct";
};

export function loadTreatments(): Treatment[] {
  const filePath = path.join(
    process.cwd(),
    "app",
    "api",
    "atonm-data",
    "treatments.yaml"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = YAML.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Expected treatments.yaml to contain an array");
  }

  return parsed as Treatment[];
}
