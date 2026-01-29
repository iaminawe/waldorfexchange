import { useTotalRaised, useSiteSettings } from "@/hooks/useFundraisingData";
import { cn } from "@/lib/utils";

interface ProgressThermometerProps {
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressThermometer({ 
  className, 
  showLabels = true,
  size = "lg" 
}: ProgressThermometerProps) {
  const { data: settings } = useSiteSettings();
  const { data: totalRaised = 0, isLoading } = useTotalRaised();

  const goal = settings?.fundraisingGoal.amount ?? 10000;
  const currency = settings?.fundraisingGoal.currency ?? "CAD";
  const percentage = Math.min((totalRaised / goal) * 100, 100);

  const sizeClasses = {
    sm: "h-28 w-7",
    md: "h-40 w-10",
    lg: "h-56 w-14",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Goal Label */}
      {showLabels && (
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Our Goal</p>
          <p className="font-display text-2xl font-bold text-accent">
            {formatCurrency(goal)}
          </p>
        </div>
      )}

      {/* Thermometer */}
      <div className="relative flex flex-col items-center">
        {/* Thermometer Body */}
        <div className={cn("relative rounded-t-full bg-muted border-2 border-border", sizeClasses[size])}>
          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-full bg-primary transition-all duration-1000 ease-out"
            style={{ height: isLoading ? "0%" : `${percentage}%` }}
          />
        </div>

        {/* Thermometer Bulb */}
        <div className="relative -mt-1">
          <div className={cn(
            "rounded-full bg-primary flex items-center justify-center",
            size === "sm" ? "h-10 w-10" : size === "md" ? "h-12 w-12" : "h-16 w-16"
          )}>
            <span className="text-white font-bold text-sm">🔥</span>
          </div>
        </div>
      </div>

      {/* Amount Raised */}
      {showLabels && (
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Raised</p>
          <p className="font-display text-2xl font-bold text-primary">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </p>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            {isLoading ? "..." : `${percentage.toFixed(0)}% there!`}
          </p>
        </div>
      )}
    </div>
  );
}
