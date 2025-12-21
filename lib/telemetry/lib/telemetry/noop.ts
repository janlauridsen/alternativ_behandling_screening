// lib/telemetry/noop.ts
// Status: No-op implementation · bevidst tom

import type { TelemetryClient, TelemetryEvent } from "./types"

export const noopTelemetry: TelemetryClient = {
  track(_event: TelemetryEvent) {
    // intentionally empty
  },
}
