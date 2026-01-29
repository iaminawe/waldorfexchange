import { useTotalRaised, useSiteSettings } from "@/hooks/useFundraisingData";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  className?: string;
}

export function ProgressBar({ className }: ProgressBarProps) {
  const { data: settings } = useSiteSettings();
  const { data: totalRaised = 0, isLoading } = useTotalRaised();

  const goal = settings?.fundraisingGoal.amount ?? 10000;
  const currency = settings?.fundraisingGoal.currency ?? "CAD";
  const percentage = Math.min((totalRaised / goal) * 100, 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-display text-xl font-bold text-primary">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </span>
          <span className="text-muted-foreground ml-2 font-medium">raised</span>
        </div>
        <div className="text-right">
          <span className="font-display text-xl font-bold text-accent">
            {formatCurrency(goal)}
          </span>
          <span className="text-muted-foreground ml-2 font-medium">goal</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-5 rounded-full bg-muted border border-border overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: isLoading ? "0%" : `${percentage}%` }}
        />
      </div>

      <p className="text-center text-sm text-muted-foreground font-medium mt-2">
        {isLoading ? "..." : `${percentage.toFixed(0)}% of our goal!`}
      </p>
    </div>
  );
}
