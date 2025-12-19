import { Treatment } from "../api/atonm-test/loadTreatments";

export function narrow(
  treatments: Treatment[],
  answers: Record<string, number>
): Treatment[] {
  let result = [...treatments];

  if (answers.Q1 === 0) {
    result = result.filter(t => t.category === "body_regulation");
  }
  if (answers.Q1 === 1) {
    result = result.filter(t => t.category === "psyche_consciousness");
  }

  if (answers.Q6 === 0 || answers.Q6 === 2) {
    result = result.filter(t => t.cost_level !== "high");
  }

  return result.slice(0, 3);
}
