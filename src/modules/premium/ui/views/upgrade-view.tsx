import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SparklesIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { PricingCard } from "../components/pricing-card";

export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: products, isLoading: loadingProducts, isError: errorProducts } = useQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  const { data: currentSubscription, isLoading: loadingSub } = useQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  if (loadingProducts || loadingSub) {
    return <UpgradeViewLoading />;
  }

  if (errorProducts || !products) {
    return <UpgradeViewError />;
  }

  return (
    <div className="flex-1 py-6 px-4 md:px-8 flex flex-col gap-y-8">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-ink backdrop-blur-xl mb-3">
          <SparklesIcon className="size-3.5 text-gold" />
          <span>Flexible Billing Plans</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
          Upgrade Your AI Calling Plan
        </h2>
        <p className="mt-2 text-sm text-mute">
          You are currently on the{" "}
          <span className="font-semibold text-ink">
            {currentSubscription?.name ?? "Free Tier"}
          </span>
          . Scale with unlimited AI agents, full transcription, and extended call minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {products.map((product: any) => {
          const isCurrentProduct = currentSubscription?.id === product.id;
          const isPremium = !!currentSubscription;

          let buttonText = "Upgrade Now";
          let onClick = () => {
            toast.info("Polar checkout will open in a secure window.");
          };

          if (isCurrentProduct) {
            buttonText = "Current Plan";
          } else if (isPremium) {
            buttonText = "Switch Plan";
          }

          const priceItem = product.prices?.[0];
          const priceAmount =
            priceItem?.amountType === "fixed" ? (priceItem.priceAmount ?? 0) / 100 : 0;
          const recurringInterval = priceItem?.recurringInterval ?? "month";

          return (
            <PricingCard
              key={product.id}
              buttonText={buttonText}
              onClick={onClick}
              variant={
                product.metadata?.variant === "highlighted" ? "highlighted" : "default"
              }
              title={product.name}
              price={priceAmount}
              description={product.description}
              priceSuffix={`/${recurringInterval}`}
              features={
                product.benefits?.map((benefit: any) => benefit.description) ?? [
                  "Custom AI Personas",
                  "Real-time Video Calls",
                  "AI Transcripts & Summaries",
                ]
              }
              badge={product.metadata?.badge as string | null}
            />
          );
        })}
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState
      title="Loading Plans"
      description="Retrieving subscription tiers and membership benefits..."
    />
  );
};

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title="Unable to load plans"
      description="Could not connect to the billing system. Please check connection and try again."
    />
  );
};
