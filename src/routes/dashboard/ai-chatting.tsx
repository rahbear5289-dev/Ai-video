import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, Bot, User, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard/ai-chatting")({
  head: () => ({
    meta: [
      { title: "AI Chatting — Northlight" },
      { name: "description", content: "Chat with AI." },
    ],
  }),
  component: AIChatting,
});

function AIChatting() {
  const messages = [
    { from: "ai", text: "Hello! I'm your AI assistant. How can I help with your launches?", time: "10:00 AM" },
    { from: "user", text: "Can you write a launch script?", time: "10:01 AM" },
    { from: "ai", text: "Absolutely! Here's a script outline:\n1. Hook (5s)\n2. Problem (10s)\n3. Solution (15s)\n4. CTA (5s)", time: "10:01 AM" },
    { from: "user", text: "Make it more emotional", time: "10:03 AM" },
    { from: "ai", text: "Sure! Let me add emotional hooks and storytelling elements...", time: "10:03 AM" },
  ];

  return (
    <div className="page-enter flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      <div className="mb-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          AI Chatting
        </h1>
        <p className="mt-1 text-sm text-mute">Chat with your AI assistant.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-5 backdrop-blur-xl">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`chat-in max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.from === "user"
                    ? "bg-ink text-paper"
                    : "bg-white/80 text-ink ring-1 ring-black/5"
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.from === "ai" ? (
                    <Bot size={12} className="text-gold" />
                  ) : (
                    <User size={12} />
                  )}
                  <span className="text-[10px] opacity-60">{msg.time}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mt-3 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-black/5 backdrop-blur-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-mute/50 focus:outline-none"
        />
        <button className="cta-sheen flex size-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 hover:-translate-y-0.5">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
