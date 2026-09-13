import { useState, useCallback } from "react";
import { DEFAULT_PAGE } from "@/constants";

export const useAgentsFilters = () => {
  const [search, setSearchState] = useState("");
  const [page, setPageState] = useState(DEFAULT_PAGE);

  const setFilters = useCallback(
    (
      updates:
        | { search?: string; page?: number }
        | ((prev: { search: string; page: number }) => { search?: string; page?: number }),
    ) => {
      const current = { search, page };
      const next = typeof updates === "function" ? updates(current) : updates;
      if (next.search !== undefined) setSearchState(next.search);
      if (next.page !== undefined) setPageState(next.page);
    },
    [search, page],
  );

  return [{ search, page }, setFilters] as const;
};
