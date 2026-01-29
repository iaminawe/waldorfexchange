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
          <span className="font-serif text-xl font-bold text-terracotta">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </span>
          <span className="text-muted-foreground ml-2">raised</span>
        </div>
        <div className="text-right">
          <span className="font-serif text-xl font-bold text-primary">
            {formatCurrency(goal)}
          </span>
          <span className="text-muted-foreground ml-2">goal</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 rounded-full bg-muted overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-terracotta-dark via-terracotta to-terracotta-light transition-all duration-1000 ease-out"
          style={{ width: isLoading ? "0%" : `${percentage}%` }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2">
        {isLoading ? "..." : `${percentage.toFixed(0)}% of our goal!`}
      </p>
    </div>
  );
}
