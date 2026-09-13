import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-xs text-mute">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="rounded-full border-black/10 text-xs text-ink hover:bg-black/5"
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className="rounded-full border-black/10 text-xs text-ink hover:bg-black/5"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
