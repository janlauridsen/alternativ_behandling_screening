// lib/telemetry/events.ts
// Canonical payload shapes (explicit & minimal)

export type FlowStartedPayload = {
  entry: "public" | "debug";
};

export type AtonmCompletedPayload = {
  remainingCount: number;
};

export type ValidationAdjustedPayload = {
  changed: boolean;
};

export type HandoffStartedPayload = {
  remainingTreatments: number;
};

export type GuardTriggeredPayload = {
  guard:
    | "crisis"
    | "do_not"
    | "terminate"
    | "other";
};
