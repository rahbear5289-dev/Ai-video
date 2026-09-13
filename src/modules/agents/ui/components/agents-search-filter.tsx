import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by agent name..."
        className="h-9 w-[220px] rounded-xl border-black/10 bg-white/80 pl-8 text-xs text-ink placeholder:text-mute focus:bg-white"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
      />
      <SearchIcon className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-mute" />
    </div>
  );
};
