import { useAuth } from "@/lib/auth";
import { LoadingState } from "@/components/loading-state";

import { ChatUI } from "./chat-ui";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const ChatProvider = ({ meetingId, meetingName }: Props) => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <LoadingState
        title="Loading..."
        description="Please wait while we load the chat"
      />
    );
  }

  const meta = (user.user_metadata || {}) as Record<string, unknown>;
  const userName =
    (typeof meta["full_name"] === "string" && meta["full_name"]) ||
    (typeof meta["name"] === "string" && meta["name"]) ||
    user.email?.split("@")[0] ||
    "User";
  const userImage = typeof meta["avatar_url"] === "string" ? meta["avatar_url"] : undefined;

  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={user.id}
      userName={userName}
      userImage={userImage}
    />
  );
};
