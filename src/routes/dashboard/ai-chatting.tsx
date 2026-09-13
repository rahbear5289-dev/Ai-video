import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Send, Bot, User, PhoneCall, Sparkles, Plus, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const Route = createFileRoute("/dashboard/ai-chatting")({
  head: () => ({
    meta: [
      { title: "AI Agent Chatting — Northlight" },
      { name: "description", content: "Chat directly with your configured AI personas and launch live calls." },
    ],
  }),
  component: AIChatting,
});

interface ChatMessage {
  id: string;
  from: "user" | "ai";
  text: string;
  time: string;
}

function AIChatting() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const [newAgentOpen, setNewAgentOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Fetch real AI agents
  const { data: agentsData, isLoading: loadingAgents } = useQuery(
    trpc.agents.getMany.queryOptions({ page: 1, pageSize: 50 }),
  );

  const activeAgent =
    agentsData?.items?.find((a) => a.id === selectedAgentId) ||
    agentsData?.items?.[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      from: "ai",
      text: "Hello! I am your configured AI agent. Select any persona from the sidebar to chat, or launch an instant video call.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const createMeetingMutation = useMutation(
    trpc.meetings.create.mutationOptions(),
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Dynamic response tailored to persona's instruction context
    setTimeout(() => {
      const agentName = activeAgent?.name ?? "AI Persona";
      const agentInstructions = activeAgent?.instructions ?? "";

      let reply = `[${agentName}] Understood! Working with instruction context: "${agentInstructions.slice(0, 80)}...". I can answer questions or jump into a live call room whenever you're ready.`;

      if (userText.toLowerCase().includes("call") || userText.toLowerCase().includes("meeting")) {
        reply = `I am ready! Click "Start Live Video Call" in the upper right corner, and our Stream Video room will be created immediately with real-time voice streaming.`;
      } else if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        reply = `Greetings! I am ${agentName}. How would you like to collaborate today?`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        from: "ai",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleStartCall = async () => {
    if (!activeAgent) return;
    try {
      const meeting = await createMeetingMutation.mutateAsync({
        agentId: activeAgent.id,
        name: `Chat Call with ${activeAgent.name}`,
      });
      if (meeting?.id) {
        navigate({ to: "/call/$meetingId", params: { meetingId: meeting.id } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-enter flex flex-col h-[calc(100vh-120px)] space-y-4">
      <NewAgentDialog open={newAgentOpen} onOpenChange={setNewAgentOpen} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            AI Agent Chat
          </h1>
          <p className="mt-0.5 text-sm text-mute">
            Live interactive conversations with your customized AI personas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeAgent && (
            <Button
              onClick={handleStartCall}
              disabled={createMeetingMutation.isPending}
              className="gap-2 rounded-full bg-ink text-paper hover:bg-ink/90 text-xs shadow-sm"
            >
              <PhoneCall className="size-3.5 text-gold" />
              {createMeetingMutation.isPending ? "Connecting..." : `Call ${activeAgent.name}`}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewAgentOpen(true)}
            className="gap-1.5 rounded-full border-black/10 bg-white/70 text-ink text-xs"
          >
            <Plus className="size-3.5" />
            New Persona
          </Button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 min-h-0">
        {/* Personas Sidebar */}
        <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-4 flex flex-col min-h-0 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-black/5 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink">
              Select Persona
            </span>
            <Sparkles className="size-3.5 text-gold" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {loadingAgents ? (
              <div className="flex items-center justify-center p-6 text-xs text-mute">
                <Loader2 className="size-4 animate-spin mr-2" /> Loading personas...
              </div>
            ) : agentsData?.items && agentsData.items.length > 0 ? (
              agentsData.items.map((ag) => {
                const isSelected = activeAgent?.id === ag.id;
                return (
                  <button
                    key={ag.id}
                    onClick={() => setSelectedAgentId(ag.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? "bg-ink text-paper shadow-sm"
                        : "hover:bg-black/5 text-ink"
                    }`}
                  >
                    <GeneratedAvatar
                      seed={ag.name}
                      variant="botttsNeutral"
                      className="size-8 rounded-lg shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate">{ag.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? "text-paper/70" : "text-mute"}`}>
                        {ag.instructions.slice(0, 30)}...
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center p-6 text-xs text-mute">
                No personas created yet.
              </div>
            )}
          </div>
        </div>

        {/* Chat Feed */}
        <div className="md:col-span-3 rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl flex flex-col min-h-0 overflow-hidden shadow-sm">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-black/5 flex items-center justify-between bg-white/40">
            <div className="flex items-center gap-3">
              <GeneratedAvatar
                seed={activeAgent?.name ?? "Agent"}
                variant="botttsNeutral"
                className="size-8 rounded-lg"
              />
              <div>
                <div className="text-xs font-semibold text-ink">
                  {activeAgent?.name ?? "AI Assistant"}
                </div>
                <div className="text-[10px] text-mute flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Ready for live interaction
                </div>
              </div>
            </div>

            <Link
              to="/dashboard/ai-calling"
              className="text-xs text-mute hover:text-ink transition-colors underline decoration-black/20"
            >
              Open AI Calling Suite &rarr;
            </Link>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`chat-in max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                    msg.from === "user"
                      ? "bg-ink text-paper"
                      : "bg-paper/80 text-ink border border-black/5 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.from === "ai" ? (
                      <Bot size={12} className="text-gold" />
                    ) : (
                      <User size={12} className="text-paper/70" />
                    )}
                    <span className="text-[10px] opacity-60">{msg.time}</span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-paper/80 border border-black/5 text-xs text-mute flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin text-gold" />
                  <span>{activeAgent?.name ?? "Agent"} is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-black/5 bg-white/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeAgent?.name ?? "AI agent"}...`}
              className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputMessage.trim() || isTyping}
              className="size-9 rounded-full bg-ink text-paper hover:bg-ink/90 shrink-0"
            >
              <Send size={14} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
