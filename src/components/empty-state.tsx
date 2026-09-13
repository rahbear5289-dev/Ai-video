interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <img src={image} alt="Empty" className="w-48 h-48 object-contain mb-4 opacity-80" />
      <div className="flex flex-col gap-y-2 max-w-md mx-auto">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-mute leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
