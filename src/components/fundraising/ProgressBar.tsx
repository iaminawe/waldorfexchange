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
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-display text-2xl font-bold text-coral">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </span>
          <span className="text-muted-foreground ml-2 font-medium">raised</span>
        </div>
        <div className="text-right">
          <span className="font-display text-2xl font-bold text-teal">
            {formatCurrency(goal)}
          </span>
          <span className="text-muted-foreground ml-2 font-medium">goal</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-6 rounded-full bg-lavender-light/50 border-3 border-lavender overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-coral via-sunny to-teal transition-all duration-1000 ease-out"
          style={{ width: isLoading ? "0%" : `${percentage}%` }}
        />
        {/* Sparkle overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
        
        {/* Moving shine effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" 
               style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      <div className="text-center mt-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunny/20 text-sunny-dark font-bold text-sm">
          ✨ {isLoading ? "..." : `${percentage.toFixed(0)}% of our goal!`}
        </span>
      </div>
    </div>
  );
}
