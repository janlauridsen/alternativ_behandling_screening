
// app/page.tsx
// Public entry – ATONM v3.4
// Status: thin client · no free text · no logic

"use client";

import { useState } from "react";

export default function Page() {
  const [started, setStarted] = useState(false);

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "80px auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>ATONM</h1>

      {!started ? (
        <>
          <p>
            ATONM er et ikke-diagnostisk orienteringsværktøj.
            <br />
            Det erstatter ikke professionel hjælp.
          </p>

          <button onClick={() => setStarted(true)}>
            Start orientering
          </button>
        </>
      ) : (
        <p style={{ opacity: 0.7 }}>
          (Public flow kobles på i næste iteration)
        </p>
      )}
    </main>
  );
}
