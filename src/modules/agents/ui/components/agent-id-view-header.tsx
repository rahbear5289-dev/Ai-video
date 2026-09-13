import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
  onBack?: (() => void) | undefined;
}

export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onRemove,
  onBack,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="font-medium text-lg text-mute hover:text-ink transition-colors"
              >
                AI Personas
              </button>
            ) : (
              <BreadcrumbLink asChild className="font-medium text-lg text-mute hover:text-ink">
                <Link to="/dashboard/ai-calling">AI Personas</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-mute text-lg font-medium [&>svg]:size-4">
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <span className="font-display font-semibold text-lg text-ink">
              {agentName}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-mute hover:text-ink">
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border-black/10">
          <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
            <PencilIcon className="size-4" />
            Edit Persona
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove} className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
            <TrashIcon className="size-4" />
            Delete Persona
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
