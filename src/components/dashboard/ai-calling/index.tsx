import { useState } from "react";
import {
  BotIcon,
  CalendarIcon,
  VideoIcon,
  PhoneCallIcon,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { parseAsString, useQueryState } from "nuqs";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Agents
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

// Meetings
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-view";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";

export function AICallingSuite() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsString.withDefault("meetings")
  );
  const [selectedMeetingId, setSelectedMeetingId] = useQueryState(
    "meetingId",
    parseAsString
  );
  const [selectedAgentId, setSelectedAgentId] = useQueryState(
    "agentId",
    parseAsString
  );

  const [newMeetingOpen, setNewMeetingOpen] = useState(false);
  const [newAgentOpen, setNewAgentOpen] = useState(false);

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
        name:
          instantMeetingName.trim() ||
          `Instant AI Call - ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
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
    <div className="flex flex-col flex-1 overflow-auto h-full bg-muted">
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

      {/* Meeting detail view — exactly like next15-meet-ai meetingId page */}
      {selectedMeetingId ? (
        <div className="flex flex-col flex-1 overflow-auto">
          <MeetingIdView
            meetingId={selectedMeetingId}
            onClose={() => setSelectedMeetingId(null)}
          />
        </div>
      ) : selectedAgentId ? (
        /* Agent detail view */
        <div className="flex flex-col flex-1 overflow-auto">
          <AgentIdView
            agentId={selectedAgentId}
            onBack={() => setSelectedAgentId(null)}
            onScheduleMeeting={(agentId) => {
              setInstantAgentId(agentId);
              setNewMeetingOpen(true);
            }}
          />
        </div>
      ) : (
        /* Main Interface matching next15-meet-ai */
        <Tabs
          value={activeTab || "meetings"}
          onValueChange={(v) => setActiveTab(v)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          {/* Top navigation tabs bar */}
          <div className="bg-background border-b px-4 md:px-8 py-2.5 flex items-center justify-between shrink-0">
            <ScrollArea>
              <TabsList className="h-9 bg-muted/60 p-1 gap-1 w-auto rounded-lg">
                <TabsTrigger
                  value="meetings"
                  className="rounded-md px-3.5 py-1 text-xs gap-1.5 font-medium transition-all"
                >
                  <CalendarIcon className="size-3.5" />
                  Meetings
                </TabsTrigger>
                <TabsTrigger
                  value="agents"
                  className="rounded-md px-3.5 py-1 text-xs gap-1.5 font-medium transition-all"
                >
                  <BotIcon className="size-3.5" />
                  AI Agents
                </TabsTrigger>
                <TabsTrigger
                  value="instant"
                  className="rounded-md px-3.5 py-1 text-xs gap-1.5 font-medium transition-all"
                >
                  <PhoneCallIcon className="size-3.5 text-emerald-600" />
                  Instant Call
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Meetings Tab — exactly like next15-meet-ai's /meetings page */}
          <TabsContent
            value="meetings"
            className="flex flex-col flex-1 m-0 overflow-auto"
          >
            <MeetingsListHeader />
            <MeetingsView
              onSelectMeeting={(id) => setSelectedMeetingId(id)}
            />
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent
            value="agents"
            className="flex flex-col flex-1 m-0 overflow-auto"
          >
            <div className="py-4 px-4 md:px-8">
              <AgentsListHeader />
            </div>
            <div className="px-4 md:px-8 pb-4 flex-1">
              <AgentsView onSelectAgent={(id) => setSelectedAgentId(id)} />
            </div>
          </TabsContent>

          {/* Instant AI Call Tab */}
          <TabsContent
            value="instant"
            className="flex flex-col flex-1 m-0 overflow-auto"
          >
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="max-w-lg w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 mx-auto">
                  <PhoneCallIcon className="size-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Launch Instant AI Video Call
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Instantly start a live meeting room and converse directly with your selected AI persona through Stream Video and OpenAI Realtime voice.
                  </p>
                </div>

                <div className="space-y-4 text-left rounded-xl border bg-card p-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Meeting Subject
                    </label>
                    <input
                      type="text"
                      value={instantMeetingName}
                      onChange={(e) => setInstantMeetingName(e.target.value)}
                      placeholder="e.g. Product Brainstorm or Interview Practice"
                      className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Select AI Persona
                    </label>
                    {agentsData?.items && agentsData.items.length > 0 ? (
                      <select
                        value={instantAgentId || agentsData.items[0]?.id}
                        onChange={(e) => setInstantAgentId(e.target.value)}
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {agentsData.items.map((ag) => (
                          <option key={ag.id} value={ag.id}>
                            {ag.name} ({ag.meetingCount} meetings)
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-xs text-muted-foreground flex items-center justify-between p-3 rounded-lg bg-muted">
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
                    className="w-full py-6 text-sm font-medium gap-2"
                  >
                    <VideoIcon className="size-4" />
                    {isLaunching ? "Connecting..." : "Join Live Call Now"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
