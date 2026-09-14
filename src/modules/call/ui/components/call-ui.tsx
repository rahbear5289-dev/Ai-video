import { useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingId: string;
  meetingName: string;
};

export const CallUI = ({ meetingId, meetingName }: Props) => {
  const trpc = useTRPC();
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const startAi = useMutation(trpc.meetings.startAiAgent.mutationOptions());

  const handleJoin = async () => {
    if (!call) return;

    await call.join();

    // Trigger AI Agent to connect into the live room
    try {
      await startAi.mutateAsync({ meetingId });
    } catch (e) {
      console.warn("Direct AI connect:", e);
    }

    setShow("call");
  };

  const handleLeave = () => {
    if (!call) return;

    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  )
};
