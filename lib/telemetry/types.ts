// lib/telemetry/types.ts
// Status: Kontrakt · ingen runtime-logik

export type TelemetryEvent =
  | {
      type: "session_start"
      timestamp: number
    }
  | {
      type: "atonm_answer"
      questionId: string
      value: string
      timestamp: number
    }
  | {
      type: "atonm_complete"
      remainingTreatments: string[]
      timestamp: number
    }
  | {
      type: "handoff_start"
      timestamp: number
    }
  | {
      type: "out_of_scope"
      reason: string
      timestamp: number
    }

export type TelemetryClient = {
  track(event: TelemetryEvent): void
}
