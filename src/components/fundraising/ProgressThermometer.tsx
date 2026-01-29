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
          <div className="mb-3 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Our Goal</p>
            <p className="font-display text-3xl font-bold text-teal">
              {formatCurrency(goal)}
            </p>
          </div>
        )}

        {/* Thermometer Body */}
        <div className={cn("relative rounded-t-full bg-lavender-light/50 border-4 border-lavender", sizeClasses[size])}>
          {/* Tick marks */}
          <div className="absolute -left-8 top-0 h-full flex flex-col justify-between py-1">
            {[100, 75, 50, 25, 0].map((tick) => (
              <div key={tick} className="flex items-center gap-1">
                <span className="text-xs font-bold text-lavender-dark w-7 text-right">
                  {tick}%
                </span>
                <div className="w-2 h-0.5 bg-lavender rounded-full" />
              </div>
            ))}
          </div>

          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-full bg-gradient-to-t from-coral-dark via-coral to-sunny transition-all duration-1000 ease-out"
            style={{ 
              height: isLoading ? "0%" : `${percentage}%`,
              "--fill-height": `${percentage}%` 
            } as React.CSSProperties}
          />

          {/* Sparkle overlay */}
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-white/30 via-transparent to-transparent" />
          
          {/* Fun dots pattern */}
          <div className="absolute inset-0 rounded-t-full opacity-20" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "8px 8px"
          }} />
        </div>

        {/* Thermometer Bulb */}
        <div className="relative -mt-3">
          <div className={cn(
            "rounded-full bg-coral flex items-center justify-center border-4 border-coral-dark animate-pulse-scale",
            size === "sm" ? "h-14 w-14" : size === "md" ? "h-18 w-18" : "h-24 w-24"
          )}>
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-coral-light to-coral-dark" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-white/30 via-transparent to-transparent" />
            <span className="relative text-white font-bold text-lg">🔥</span>
          </div>
        </div>
      </div>

      {/* Amount Raised */}
      {showLabels && (
        <div className="text-center mt-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Raised so far</p>
          <p className="font-display text-4xl font-bold text-coral">
            {isLoading ? "..." : formatCurrency(totalRaised)}
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunny/20 text-sunny-dark font-bold text-sm">
            🎉 {isLoading ? "..." : `${percentage.toFixed(0)}% there!`}
          </div>
        </div>
      )}
    </div>
  );
}
