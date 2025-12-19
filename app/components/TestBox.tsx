"use client";

import { useState } from "react";

export default function TestBox({
  endpoint,
}: {
  endpoint: string;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function send() {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setOutput(data.reply || JSON.stringify(data, null, 2));
  }

  return (
    <div>
      <textarea
        rows={4}
        style={{ width: "100%", marginBottom: "8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={send}>Send</button>

      <pre style={{ marginTop: "12px", background: "#f5f5f5", padding: "8px" }}>
        {output}
      </pre>
    </div>
  );
}
