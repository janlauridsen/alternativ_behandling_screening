"use client";

import { useState } from "react";

export interface TestBoxProps {
  endpoint: string;
  initialSystemContext?: any;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TestBox(props: TestBoxProps) {
  const { endpoint, initialSystemContext } = props;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  async function send() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

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

    const assistantMessage: Message = {
      role: "assistant",
      content: data.reply,
    };

    setMessages((m) => [...m, assistantMessage]);
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
