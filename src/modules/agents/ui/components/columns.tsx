import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { AgentsGetMany } from "../../types";

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2.5">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-7 rounded-full ring-1 ring-black/10"
          />
          <span className="font-medium text-ink capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2 pl-9">
          <CornerDownRightIcon className="size-3 text-mute" />
          <span className="text-xs text-mute max-w-[280px] truncate">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="inline-flex items-center gap-x-1.5 rounded-full border-black/10 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold"
      >
        <VideoIcon className="size-3.5" />
        {row.original.meetingCount} {row.original.meetingCount === 1 ? "call" : "calls"}
      </Badge>
    ),
  },
];
