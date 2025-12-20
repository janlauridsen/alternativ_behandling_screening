// app/api/atonm-test/loadTreatments.ts

import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { Treatment } from "../../atonm/types";

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

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Expected treatments.yaml to be an object map");
  }

  return Object.entries(parsed).map(([id, value]) => ({
    id,
    ...(value as Omit<Treatment, "id">),
  }));
}
