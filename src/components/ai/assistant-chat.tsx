"use client";

import React, { useState } from "react";
import { runAgent } from "@/features/ai/agent/langgraph";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function runCodeViaAPI(code: string, language?: string): Promise<string> {
  try {
    const res = await fetch("/api/e2b/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return `Error: ${err?.error ?? res.statusText}`;
    }
    const data = await res.json();
    const out = [
      data.text && `Output:\n${data.text}`,
      Array.isArray(data.results) && data.results.length > 0 && `Results: ${JSON.stringify(data.results)}`,
      Array.isArray(data.logs) && data.logs.length > 0 && `Logs:\n${data.logs.join("\n")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    return out || "No output";
  } catch (e: any) {
    return `Error: ${e?.message ?? "Failed to run code"}`;
  }
}

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // Simple command to run code via E2B: /runpy and /runjs
      if (userMsg.content.startsWith("/runpy ")) {
        const code = userMsg.content.replace("/runpy ", "");
        const out = await runCodeViaAPI(code, "python");
        const aiMsg: ChatMessage = { role: "assistant", content: out };
        setMessages((m) => [...m, aiMsg]);
      } else if (userMsg.content.startsWith("/runjs ")) {
        const code = userMsg.content.replace("/runjs ", "");
        const out = await runCodeViaAPI(code, "javascript");
        const aiMsg: ChatMessage = { role: "assistant", content: out };
        setMessages((m) => [...m, aiMsg]);
      } else {
        const res = await runAgent({ prompt: userMsg.content });
        const aiMsg: ChatMessage = { role: "assistant", content: res.text };
        setMessages((m) => [...m, aiMsg]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border bg-white">
      <div className="p-4 space-y-3 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">
            Start a conversation, or run code: 
            <code className="ml-1 rounded bg-gray-100 px-1">/runpy print(1+1)</code> or
            <code className="ml-1 rounded bg-gray-100 px-1">/runjs console.log(1+1)</code>
          </p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span
                className={
                  "inline-block rounded-xl px-3 py-2 text-sm " +
                  (m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900")
                }
              >
                {m.content}
              </span>
            </div>
          ))
        )}
      </div>
      <form onSubmit={onSend} className="flex gap-2 p-3 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something... or use /runpy, /runjs"
          className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}