// lib/guards/respond.ts
// Guard responses – short, neutral, terminating

export function respond(type: "do_not" | "terminate" | "crisis"): string {
  switch (type) {
    case "crisis":
      return (
        "Jeg kan ikke hjælpe med dette her.\n\n" +
        "Hvis du er i akut krise, kan du kontakte:\n" +
        "• Akut: 112\n" +
        "• Livslinien: 70 201 201\n" +
        "• Psykiatrisk akutmodtagelse"
      );

    case "do_not":
      return "Det kan jeg ikke hjælpe med.";

    case "terminate":
    default:
      return "Denne samtale kan jeg ikke fortsætte.";
  }
}
