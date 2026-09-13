import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({
  title,
  description,
}: Props) => {
  return (
    <div className="py-8 px-4 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 rounded-[min(2vw,18px)] border border-red-500/10 bg-white/70 p-8 shadow-sm backdrop-blur-xl max-w-md text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-500/15 text-red-600">
          <AlertCircleIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="font-display text-lg font-semibold text-ink">{title}</h4>
          <p className="text-sm text-mute leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
