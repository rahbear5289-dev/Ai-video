import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { CallProvider } from "../components/call-provider";

interface Props {
  meetingId: string;
};

export const CallView = ({
  meetingId
}: Props) => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingState
          title="Loading meeting"
          description="Please wait while we set up your call..."
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting not found"
          description="The meeting you are trying to join does not exist or has been removed."
        />
      </div>
    );
  }

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};
