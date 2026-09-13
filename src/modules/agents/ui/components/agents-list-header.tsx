import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { NewAgentDialog } from "./new-agent-dialog";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">AI Personas</h3>
            <p className="text-xs text-mute mt-0.5">Customize personality, voice instructions, and domain roles.</p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="sm"
            className="rounded-full bg-ink text-paper hover:bg-ink/90 font-medium px-4 shadow-sm"
          >
            <PlusIcon className="size-4 mr-1.5" />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 py-1">
            <AgentsSearchFilter />
            {isAnyFilterModified && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="h-9 rounded-xl border-black/10 text-xs text-mute hover:text-ink hover:bg-black/5"
              >
                <XCircleIcon className="size-3.5 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
