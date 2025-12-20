import { NextResponse } from "next/server";
import { narrow } from "../../atonm/narrow";
import { loadTreatments } from "./loadTreatments";

/**
 * ATONM v1.1 – backend runtime
 * - Structured Q1–Q6
 * - Monotonic narrowing
 * - Final explanatory synthesis (non-advisory)
 */

type ATONMState = {
  index: number;
  answers: Record<string, number>;
  done: boolean;
};

const FINAL_STEP = 6;

export async function POST(req: Request) {
  const body = await req.json();
  const { state, event, intakeText } = body;

  // ---------- INIT ----------
  if (event?.type === "START") {
    const newState: ATONMState = {
      index: state?.index ?? 0,
      answers: {},
      done: false,
    };

    return NextResponse.json({
      state: newState,
      remainingCount: loadTreatments().length,
    });
  }

  if (!state || state.done) {
    return NextResponse.json({ done: true });
  }

  // ---------- ANSWER ----------
  if (event?.type === "ANSWER") {
    const newAnswers = {
      ...state.answers,
      [`Q${state.index + 1}`]: event.value,
    };

    const nextIndex = state.index + 1;
    const treatments = loadTreatments();
    const narrowed = narrow(treatments, newAnswers);

    // ---------- FINAL ----------
    if (nextIndex >= FINAL_STEP) {
      const synthesis = narrowed.map((t) =>
        buildSynthesis({
          treatmentId: t.id,
          answers: newAnswers,
          intakeText,
        })
      );

      return NextResponse.json({
        done: true,
        result: synthesis,
        handoffContext: {
          intakeText,
          answers: newAnswers,
          remainingTreatments: narrowed.map((t) => t.id),
        },
      });
    }

    // ---------- CONTINUE ----------
    return NextResponse.json({
      state: {
        index: nextIndex,
        answers: newAnswers,
        done: false,
      },
      remainingCount: narrowed.length,
    });
  }

  return NextResponse.json({ done: true });
}

/* ------------------------------------------------------------------ */
/* --------------------- SYNTHESIS HELPERS --------------------------- */
/* ------------------------------------------------------------------ */

function buildSynthesis({
  treatmentId,
  answers,
  intakeText,
}: {
  treatmentId: string;
  answers: Record<string, number>;
  intakeText?: string;
}) {
  const lines: string[] = [];

  lines.push(describeMethodCore(treatmentId));
  lines.push(describeContext(answers));
  lines.push(describeStyle(answers));

  if (intakeText) {
    lines.push(
      `I en situation som den, du beskrev indledningsvis${
        extractKeyword(intakeText)
          ? ` (${extractKeyword(intakeText)})`
          : ""
      }, kan denne tilgang opleves som én mulig måde at undersøge sammenhængene på – uden at fastlægge, hvad der skal ændres.`
    );
  }

  return {
    id: treatmentId,
    text: lines.join("\n"),
  };
}

function describeMethodCore(id: string): string {
  switch (id) {
    case "hypnoterapi":
      return "Hypnoterapi beskrives ofte som en tilgang, der arbejder med fokuseret opmærksomhed og indre oplevelse.";
    case "nada":
      return "NADA forbindes typisk med kropslig regulering i rolige, strukturerede rammer.";
    case "zoneterapi":
      return "Zoneterapi tager udgangspunkt i kropsligt arbejde og bruges i mange forskellige sammenhænge.";
    default:
      return "Denne tilgang beskrives som en mulig orienterende metode.";
  }
}

function describeContext(answers: Record<string, number>): string {
  const q1 = answers.Q1;
  const q2 = answers.Q2;

  if (q1 === 2) {
    return "Den anvendes ofte i sammenhænge, hvor oplevelsen både har kropslige og mentale aspekter.";
  }

  if (q2 === 2) {
    return "Den omtales ofte i relation til oplevelser, der vender tilbage over tid.";
  }

  return "Den bruges i forskellige kontekster afhængigt af person og situation.";
}

function describeStyle(answers: Record<string, number>): string {
  const q3 = answers.Q3;

  if (q3 === 2) {
    return "Formatet indebærer typisk en guidet proces, hvor man ikke selv skal styre forløbet aktivt.";
  }

  if (q3 === 0) {
    return "Tilgangen forudsætter ofte en vis grad af egen involvering undervejs.";
  }

  return "Arbejdsformen kan opleves forskelligt afhængigt af præferencer og rammer.";
}

function extractKeyword(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("fly")) return "flyskræk";
  if (t.includes("eksamen")) return "eksamen";
  if (t.includes("præsentation")) return "præsentation";
  return null;
}
