import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva("rounded-2xl p-6 w-full transition-all duration-300 backdrop-blur-xl border", {
  variants: {
    variant: {
      default: "bg-white/70 text-ink border-black/5 hover:border-black/10 hover:shadow-md",
      highlighted: "bg-ink text-paper border-ink shadow-xl ring-1 ring-gold/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardIconVariants = cva("size-4 shrink-0", {
  variants: {
    variant: {
      default: "text-emerald-600",
      highlighted: "text-gold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-mute",
      highlighted: "text-paper/70",
    },
  },
});

const pricingCardBadgeVariants = cva("text-xs font-medium px-2.5 py-0.5 rounded-full", {
  variants: {
    variant: {
      default: "bg-black/5 text-ink border-black/10",
      highlighted: "bg-gold/20 text-gold border-gold/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  variant,
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
}: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className)}>
      <div className="flex items-start gap-x-4 justify-between">
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <h3 className="font-display font-semibold text-xl">{title}</h3>
            {badge ? (
              <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                {badge}
              </Badge>
            ) : null}
          </div>
          {description && (
            <p className={cn(pricingCardSecondaryTextVariants({ variant }))}>
              {description}
            </p>
          )}
        </div>
        <div className="flex items-baseline shrink-0 gap-x-1">
          <span className="text-3xl font-display font-semibold tracking-tight">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </span>
          <span className={cn("text-xs", pricingCardSecondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>

      <div className="py-4">
        <Separator className={variant === "highlighted" ? "bg-white/10" : "bg-black/5"} />
      </div>

      <Button
        className={cn(
          "w-full rounded-full font-medium transition-all",
          variant === "highlighted"
            ? "bg-gold text-ink hover:bg-gold/90 shadow-sm"
            : "bg-ink text-paper hover:bg-ink/90",
        )}
        size="lg"
        onClick={onClick}
      >
        {buttonText}
      </Button>

      <div className="flex flex-col gap-y-3 mt-6">
        <p className={cn("text-xs font-semibold uppercase tracking-wider", pricingCardSecondaryTextVariants({ variant }))}>
          Included Features
        </p>
        <ul className="flex flex-col gap-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5">
              <CircleCheckIcon className={cn(pricingCardIconVariants({ variant }))} />
              <span className={variant === "highlighted" ? "text-paper/90" : "text-ink/90"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
