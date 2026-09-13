import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOpenChange = (openState: boolean) => {
    onSearch?.("");
    setOpen(openState);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-10 justify-between font-normal px-3 rounded-xl border-black/10 bg-white/80 text-ink hover:bg-white",
          !selectedOption && "text-mute",
          className,
        )}
      >
        <div className="truncate">
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="overflow-hidden p-0 rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl shadow-xl max-w-md">
          <Command shouldFilter={!onSearch}>
            <CommandInput
              placeholder="Search..."
              {...(onSearch ? { onValueChange: onSearch } : {})}
              className="border-b border-black/5"
            />
            <CommandList className="max-h-[300px] p-1">
              <CommandEmpty>
                <span className="text-mute text-sm p-4 block text-center">
                  No options found
                </span>
              </CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}
                  className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-black/5 cursor-pointer"
                >
                  {option.children}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};
