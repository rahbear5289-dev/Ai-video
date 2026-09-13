import { useState } from "react";
import { toast } from "sonner";
import { VideoIcon, ArrowLeftIcon, SparklesIcon, CalendarIcon } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface Props {
  agentId: string;
  onBack?: () => void;
  onScheduleMeeting?: (agentId: string) => void;
}

export const AgentIdView = ({ agentId, onBack, onScheduleMeeting }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data, isLoading, isError } = useQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        await queryClient.invalidateQueries(trpc.premium.getFreeUsage.queryOptions());
        toast.success("Agent persona removed");
        onBack?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Remove Agent Persona?",
    `This action will permanently delete "${data?.name ?? "this agent"}" and remove ${data?.meetingCount ?? 0} associated meetings. This action cannot be undone.`,
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };

  if (isLoading) {
    return <AgentIdViewLoading />;
  }

  if (isError || !data) {
    return <AgentIdViewError />;
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-6">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
          onBack={onBack}
        />

        {/* Hero Card */}
        <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/5">
            <div className="flex items-center gap-4">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-14 ring-2 ring-gold/20 rounded-2xl"
              />
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {data.name}
                </h2>
                <p className="text-xs text-mute mt-0.5">
                  AI persona ready for interactive calls and meetings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-3 py-1 text-xs border-black/10 bg-white/60 text-ink font-medium"
              >
                <VideoIcon className="size-3.5 text-blue-600" />
                {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
              </Badge>
              {onScheduleMeeting && (
                <Button
                  size="sm"
                  onClick={() => onScheduleMeeting(agentId)}
                  className="gap-1.5 bg-ink text-paper hover:bg-ink/90 rounded-full text-xs"
                >
                  <CalendarIcon className="size-3.5" />
                  Schedule Call
                </Button>
              )}
            </div>
          </div>

          {/* Persona Instructions */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-ink font-medium text-sm">
              <SparklesIcon className="size-4 text-gold" />
              <span>Prompt &amp; Behavioral Instructions</span>
            </div>
            <div className="rounded-xl border border-black/5 bg-paper/60 p-4">
              <p className="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap font-mono text-xs">
                {data.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent Persona"
      description="Retrieving persona settings and prompt instructions..."
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Persona Not Found"
      description="Unable to load this AI persona. It may have been deleted or the connection was interrupted."
    />
  );
};
