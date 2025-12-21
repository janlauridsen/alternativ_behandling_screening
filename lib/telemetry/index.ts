// lib/telemetry/index.ts
// Status: Central entrypoint

import { noopTelemetry } from "./noop"
import type { TelemetryClient } from "./types"

// Senere kan dette skiftes baseret på env / config
export const telemetry: TelemetryClient = noopTelemetry
