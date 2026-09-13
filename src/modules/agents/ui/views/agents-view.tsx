import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";

import { columns } from "../components/columns";
import { DataPagination } from "@/components/data-pagination";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

interface AgentsViewProps {
  onSelectAgent?: (agentId: string) => void;
}

export const AgentsView = ({ onSelectAgent }: AgentsViewProps) => {
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();

  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );

  if (isLoading) {
    return <AgentsViewLoading />;
  }

  if (isError || !data) {
    return <AgentsViewError />;
  }

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      {data.items.length > 0 ? (
        <>
          <DataTable
            data={data.items}
            columns={columns}
            onRowClick={(row) => onSelectAgent?.(row.id)}
          />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
        </>
      ) : (
        <EmptyState
          title="No AI personas yet"
          description="Create an agent to conduct AI meetings and phone calls. Your agents will follow specific instructions and interact naturally with participants."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading AI Personas"
      description="Retrieving your configured AI agents..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Unable to load AI personas. Please ensure database connection is configured."
    />
  );
};
