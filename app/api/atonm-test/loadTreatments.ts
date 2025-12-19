import YAML from "yaml";
import treatmentsRaw from "../../treatments.yaml";

export type Treatment = {
  id: string;
  category: string;
  focus_profile: {
    body: number;
    mind: number;
    energy_spiritual: number;
    lifestyle_behavior: number;
  };
  interaction_style: {
    passive: number;
    active: number;
    dialog_based: number;
  };
  abstraction_level: {
    concrete: number;
    interpretive: number;
  };
  practitioner_dependency: string;
  typical_use_case: string[];
  evidence_orientation: string;
  cost_level: string;
};

export function loadTreatments(): Treatment[] {
  return YAML.parse(treatmentsRaw as string);
}
