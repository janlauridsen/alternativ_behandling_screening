// lib/telemetry/sink.ts
// Telemetry sink – v1 (console only, no persistence)

import type { TelemetryEvent } from "./types";

export function sink(event: TelemetryEvent): void {
  if (process.env.NODE_ENV === "production") {
    console.log("[telemetry]", JSON.stringify(event));
  }
}
