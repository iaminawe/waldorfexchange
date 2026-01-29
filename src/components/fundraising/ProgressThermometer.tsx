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
    sm: "h-32 w-8",
    md: "h-48 w-12",
    lg: "h-72 w-16",
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
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Thermometer Container */}
      <div className="relative flex flex-col items-center">
        {/* Goal Label */}
        {showLabels && (
          <div className="mb-2 text-center">
            <p className="text-sm font-medium text-muted-foreground">Our Goal</p>
            <p className="font-serif text-2xl font-bold text-primary">
              {formatCurrency(goal)}
            </p>
          </div>
        )}

        {/* Thermometer Body */}
        <div className={cn("relative rounded-t-full bg-muted", sizeClasses[size])}>
          {/* Tick marks */}
          <div className="absolute -left-6 top-0 h-full flex flex-col justify-between py-1">
            {[100, 75, 50, 25, 0].map((tick) => (
              <div key={tick} className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground w-6 text-right">
                  {tick}%
                </span>
                <div className="w-2 h-px bg-border" />
              </div>
            ))}
          </div>

          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-full bg-gradient-to-t from-terracotta-dark via-terracotta to-terracotta-light transition-all duration-1000 ease-out"
            style={{ 
              height: isLoading ? "0%" : `${percentage}%`,
              "--fill-height": `${percentage}%` 
            } as React.CSSProperties}
          />

          {/* Glass effect overlay */}
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-white/20 via-transparent to-transparent" />
        </div>

        {/* Thermometer Bulb */}
        <div className="relative -mt-2">
          <div className={cn(
            "rounded-full bg-terracotta flex items-center justify-center",
            size === "sm" ? "h-12 w-12" : size === "md" ? "h-16 w-16" : "h-20 w-20"
          )}>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-terracotta-light to-terracotta-dark" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-white/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Amount Raised */}
      {showLabels && (
        <div className="text-center mt-2">
          <p className="text-sm font-medium text-muted-foreground">Raised so far</p>
          <p className="font-serif text-3xl font-bold text-terracotta">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? "..." : `${percentage.toFixed(0)}% of goal`}
          </p>
        </div>
      )}
    </div>
  );
}
