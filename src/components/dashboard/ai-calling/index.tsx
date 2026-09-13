import { useState } from "react";
import {
  BotIcon,
  CalendarIcon,
  PlusIcon,
  SparklesIcon,
  VideoIcon,
  ArrowLeftIcon,
  PhoneCallIcon,
  ZapIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-view";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";

export function AICallingSuite() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"meetings" | "agents" | "instant">("meetings");
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [newMeetingOpen, setNewMeetingOpen] = useState(false);
  const [newAgentOpen, setNewAgentOpen] = useState(false);

  // Free Tier / Premium stats
  const { data: usage } = useQuery(
    trpc.premium.getFreeUsage.queryOptions(),
  );

  const { data: agentsData } = useQuery(
    trpc.agents.getMany.queryOptions({ page: 1, pageSize: 50 }),
  );

  const [instantAgentId, setInstantAgentId] = useState<string>("");
  const [instantMeetingName, setInstantMeetingName] = useState<string>("");
  const [isLaunching, setIsLaunching] = useState(false);

  const createMeetingMutation = useMutation(
    trpc.meetings.create.mutationOptions(),
  );

  const handleLaunchInstantCall = async () => {
    const chosenAgentId = instantAgentId || agentsData?.items?.[0]?.id;
    if (!chosenAgentId) {
      setNewAgentOpen(true);
      return;
    }

    setIsLaunching(true);
    try {
      const meeting = await createMeetingMutation.mutateAsync({
        agentId: chosenAgentId,
        name: instantMeetingName.trim() || `Instant AI Call - ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      });

      if (meeting?.id) {
        navigate({ to: "/call/$meetingId", params: { meetingId: meeting.id } });
      }
    } catch (e) {
      console.error("Failed to launch instant call:", e);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="page-enter flex flex-col h-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-mute">
              Real-time AI Voice &amp; Video Calling
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            AI Calling &amp; Agent Suite
          </h1>
          <p className="mt-1 text-sm text-mute max-w-2xl">
            Configure custom AI personas with dynamic behavioral instructions, conduct real-time AI meetings, and inspect automatic transcripts &amp; takeaways.
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setNewAgentOpen(true)}
            className="gap-2 rounded-full border-black/10 bg-white/70 backdrop-blur-md text-ink hover:bg-black/5 text-sm"
          >
            <BotIcon className="size-4 text-gold" />
            New Persona
          </Button>

          <Button
            onClick={() => setNewMeetingOpen(true)}
            className="gap-2 rounded-full bg-ink text-paper hover:bg-ink/90 shadow-sm text-sm"
          >
            <PlusIcon className="size-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mute font-medium">AI Personas</span>
            <BotIcon className="size-4 text-gold" />
          </div>
          <div className="mt-2 text-2xl font-semibold font-display text-ink">
            {agentsData?.total ?? 0}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mute font-medium">Meetings</span>
            <CalendarIcon className="size-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold font-display text-ink">
            {usage ? `${usage.meetingCount}/3 Free` : "Unlimited"}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mute font-medium">Audio Engine</span>
            <ZapIcon className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xs font-semibold text-ink flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            OpenAI Realtime
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mute font-medium">Video Network</span>
            <VideoIcon className="size-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xs font-semibold text-ink flex items-center gap-1.5">
            <ShieldCheckIcon className="size-3.5 text-blue-500" />
            Stream Video RTC
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <NewAgentDialog open={newAgentOpen} onOpenChange={setNewAgentOpen} />
      <NewMeetingDialog
        open={newMeetingOpen}
        onOpenChange={setNewMeetingOpen}
        onSuccess={(id) => {
          setNewMeetingOpen(false);
          if (id) setSelectedMeetingId(id);
        }}
      />

      {/* Detail Views */}
      {selectedMeetingId ? (
        <div className="stagger-in rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl overflow-hidden flex-1 flex flex-col min-h-[500px]">
          <div className="border-b border-black/5 px-6 py-3 flex items-center justify-between bg-white/40">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedMeetingId(null)}
              className="gap-2 -ml-2 text-mute hover:text-ink"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Meetings
            </Button>
            <Badge variant="outline" className="border-black/10 text-xs font-mono">
              Meeting ID: {selectedMeetingId.slice(0, 8)}...
            </Badge>
          </div>
          <ScrollArea className="flex-1">
            <MeetingIdView
              meetingId={selectedMeetingId}
              onClose={() => setSelectedMeetingId(null)}
            />
          </ScrollArea>
        </div>
      ) : selectedAgentId ? (
        <div className="stagger-in rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl overflow-hidden flex-1 flex flex-col min-h-[500px]">
          <div className="border-b border-black/5 px-6 py-3 flex items-center justify-between bg-white/40">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAgentId(null)}
              className="gap-2 -ml-2 text-mute hover:text-ink"
            >
              <ArrowLeftIcon className="size-4" />
              Back to AI Personas
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <AgentIdView
              agentId={selectedAgentId}
              onBack={() => setSelectedAgentId(null)}
              onScheduleMeeting={(agentId) => {
                setInstantAgentId(agentId);
                setNewMeetingOpen(true);
              }}
            />
          </ScrollArea>
        </div>
      ) : (
        /* Main Tabbed Interface */
        <div className="stagger-in rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl overflow-hidden flex-1 flex flex-col min-h-[550px] shadow-sm">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "meetings" | "agents" | "instant")}
            className="flex-1 flex flex-col"
          >
            {/* Tab Bar */}
            <div className="border-b border-black/5 bg-white/50 px-4">
              <ScrollArea>
                <TabsList className="h-12 bg-transparent p-0 gap-2 w-auto">
                  <TabsTrigger
                    value="meetings"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-ink rounded-none h-full px-4 gap-2 text-mute data-[state=active]:text-ink font-medium transition-all"
                  >
                    <CalendarIcon className="size-4" />
                    Meetings &amp; Sessions
                  </TabsTrigger>
                  <TabsTrigger
                    value="agents"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-ink rounded-none h-full px-4 gap-2 text-mute data-[state=active]:text-ink font-medium transition-all"
                  >
                    <BotIcon className="size-4" />
                    AI Personas &amp; Agents
                  </TabsTrigger>
                  <TabsTrigger
                    value="instant"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-ink rounded-none h-full px-4 gap-2 text-mute data-[state=active]:text-ink font-medium transition-all"
                  >
                    <PhoneCallIcon className="size-4 text-emerald-600" />
                    Instant AI Call
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Meetings Tab */}
            <TabsContent value="meetings" className="flex-1 flex flex-col m-0 p-4 md:p-6">
              <MeetingsListHeader />
              <div className="mt-4 flex-1">
                <MeetingsView onSelectMeeting={(id) => setSelectedMeetingId(id)} />
              </div>
            </TabsContent>

            {/* Agents Tab */}
            <TabsContent value="agents" className="flex-1 flex flex-col m-0 p-4 md:p-6">
              <AgentsListHeader />
              <div className="mt-4 flex-1">
                <AgentsView onSelectAgent={(id) => setSelectedAgentId(id)} />
              </div>
            </TabsContent>

            {/* Instant Call Launcher Tab */}
            <TabsContent value="instant" className="flex-1 flex flex-col m-0 p-6 md:p-10 justify-center items-center">
              <div className="max-w-xl w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-gold/10 text-gold ring-1 ring-gold/30 mx-auto">
                  <PhoneCallIcon className="size-8 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                    Launch Instant AI Video Call
                  </h2>
                  <p className="mt-2 text-sm text-mute">
                    Instantly start a live meeting room and converse directly with your selected AI persona through Stream Video and OpenAI Realtime voice synthesis.
                  </p>
                </div>

                <div className="space-y-4 text-left rounded-2xl border border-black/5 bg-paper/60 p-6">
                  <div>
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider block mb-1.5">
                      Meeting Subject
                    </label>
                    <input
                      type="text"
                      value={instantMeetingName}
                      onChange={(e) => setInstantMeetingName(e.target.value)}
                      placeholder="e.g. Q4 Strategy Review or Product Brainstorm"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider block mb-1.5">
                      Select AI Persona
                    </label>
                    {agentsData?.items && agentsData.items.length > 0 ? (
                      <select
                        value={instantAgentId || agentsData.items[0]?.id}
                        onChange={(e) => setInstantAgentId(e.target.value)}
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        {agentsData.items.map((ag) => (
                          <option key={ag.id} value={ag.id}>
                            {ag.name} ({ag.meetingCount} meetings)
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-xs text-mute flex items-center justify-between p-3 rounded-lg bg-black/5">
                        <span>No personas configured yet.</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setNewAgentOpen(true)}
                          className="text-xs h-7"
                        >
                          Create Persona
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleLaunchInstantCall}
                    disabled={isLaunching || !agentsData?.items || agentsData.items.length === 0}
                    className="w-full rounded-full bg-ink text-paper hover:bg-ink/90 py-6 text-sm font-medium gap-2 shadow-sm transition-transform active:scale-[0.99]"
                  >
                    <VideoIcon className="size-4 text-gold" />
                    {isLaunching ? "Connecting Room..." : "Join Live Call Now"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Feature Badges Footer */}
      {!selectedMeetingId && !selectedAgentId && (
        <div className="flex items-center gap-3 flex-wrap text-xs text-mute">
          {[
            { icon: SparklesIcon, label: "AI Summaries via GPT-4o", color: "text-gold" },
            { icon: VideoIcon, label: "HD Stream Video & RTC", color: "text-blue-600" },
            { icon: BotIcon, label: "Autonomous AI Agents", color: "text-emerald-600" },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-black/5 bg-white/60 px-3 py-1 font-medium text-ink backdrop-blur-xl"
            >
              <Icon className={`size-3.5 ${color}`} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
