"use client";

import { useState } from "react";

export interface TestBoxProps {
  endpoint: string;
  initialSystemContext?: any;
}

export default function TestBox(props: TestBoxProps) {
  const { endpoint, initialSystemContext } = props;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  async function send() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        systemContext: initialSystemContext,
      }),
    });

    const data = await res.json();

    setMessages((m) => [
      ...m,
      { role: "assistant", content: data.reply },
    ]);
  }

  return (
    <div>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "8px",
          marginBottom: "8px",
          minHeight: "120px",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <strong>{m.role === "user" ? "Du" : "System"}:</strong>{" "}
            {m.content}
          </div>
        ))}
      </div>

      <textarea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />

      <button onClick={send}>Send</button>
    </div>
  );
}
