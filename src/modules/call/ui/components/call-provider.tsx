import { LoaderIcon } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { generateAvatarUri } from "@/lib/avatar";

import { CallConnect } from "./call-connect";

interface Props {
  meetingId: string;
  meetingName: string;
};

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { user, loading } = useAuth();

  if (!user || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  const meta = (user.user_metadata || {}) as Record<string, unknown>;
  const userName =
    (typeof meta["full_name"] === "string" && meta["full_name"]) ||
    (typeof meta["name"] === "string" && meta["name"]) ||
    user.email?.split("@")[0] ||
    "User";
  const userImage =
    (typeof meta["avatar_url"] === "string" && meta["avatar_url"]) ||
    generateAvatarUri({ seed: userName, variant: "initials" });

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={user.id}
      userName={userName}
      userImage={userImage}
    />
  );
};
