"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { ChatBubble } from "@/components/ChatBubble";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "judge" as const,
      content: "Welcome to The AI Debate Council. Enter a topic, startup idea, or controversy, and our agents will debate it from all angles.",
    },
  ]);
  const [isDebating, setIsDebating] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: topic }]);
    setIsDebating(true);
    setTopic("");

    // Simulate the debate for the UI Demo
    // In production, this connects to the FastAPI SSE/WebSocket endpoint
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "skeptic", content: "This idea has significant flaws. The market is saturated, and the technical implementation risks are extremely high without a unique moat." }]);
    }, 1500);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "optimist", content: "I disagree! While the market is competitive, this specific angle taps into an underserved niche. With the right execution, it could disrupt incumbents completely." }]);
    }, 4000);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "judge", content: "Verdict: The idea shows promise but requires a strong defensive strategy. The Skeptic is right about market saturation, but The Optimist correctly identifies the niche potential. Proceed, but prioritize building a technical moat." }]);
      setIsDebating(false);
    }, 7000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] -z-10" />

      <header className="w-full max-w-4xl flex items-center justify-center py-6 border-b border-white/10 mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-2">
          <Sparkles className="text-blue-400" />
          Agentic Discourse
        </h1>
      </header>

      <div className="flex-1 w-full max-w-4xl flex flex-col gap-6 overflow-y-auto pb-32 no-scrollbar">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {isDebating && (
          <div className="flex items-center gap-2 text-slate-400 self-center mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200" />
            <span className="ml-2 text-sm">Agents are debating...</span>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/80 to-transparent">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleStart} className="relative flex items-center">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isDebating}
              placeholder="Propose a topic (e.g. 'Is AI replacing software engineers?')"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pr-16 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isDebating || !topic.trim()}
              className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-full transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
