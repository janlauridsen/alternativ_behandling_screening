// app/debug/components/StatePanel.tsx
// Status: Read-only debug · sektioneret snapshot

"use client"

import type { ATONMState } from "../../../lib/state"
import StateSection from "./StateSection"

type Props = {
  state: ATONMState | null
}

export default function StatePanel({ state }: Props) {
  if (!state) {
    return <pre style={{ opacity: 0.6 }}>(no state yet)</pre>
  }

  return (
    <div>
      <StateSection title="phase" data={state.phase} />
      <StateSection title="intakeText" data={state.intakeText} />
      <StateSection title="answers" data={state.answers} />
      <StateSection title="profile" data={state.profile} />
      <StateSection
        title="remainingTreatments"
        data={state.remainingTreatments}
      />
      <StateSection
        title="flags"
        data={{
          locked: state.locked,
          outOfScope: state.outOfScope,
          terminatedReason: state.terminatedReason,
        }}
      />
    </div>
  )
}
