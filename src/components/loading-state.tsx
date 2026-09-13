import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({
  title,
  description,
}: Props) => {
  return (
    <div className="py-8 px-4 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 rounded-[min(2vw,18px)] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur-xl max-w-md text-center">
        <Loader2Icon className="size-6 animate-spin text-gold" />
        <div className="flex flex-col gap-y-1">
          <h4 className="font-display text-lg font-semibold text-ink">{title}</h4>
          <p className="text-sm text-mute leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
