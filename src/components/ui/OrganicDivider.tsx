import { cn } from "@/lib/utils";

interface OrganicDividerProps {
  className?: string;
  color?: string;
}

/**
 * Hand-drawn style wavy line divider inspired by nelsonwaldorf.org
 * Uses an organic SVG path instead of a clean straight border
 */
export function OrganicDivider({ className, color = "currentColor" }: OrganicDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden py-2", className)}>
      <svg
        viewBox="0 0 1200 8"
        preserveAspectRatio="none"
        className="w-full h-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,4 C40,2 80,6 120,3.5 C160,1 200,5.5 240,4 C280,2.5 320,6 360,3 C400,0.5 440,5 480,4.2 C520,3.4 560,6.5 600,3.8 C640,1.2 680,5.8 720,4.5 C760,3.2 800,6.2 840,3.2 C880,0.2 920,5.5 960,4 C1000,2.5 1040,6 1080,3.5 C1120,1 1160,5 1200,4"
          fill="none"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Rough/organic edge that replaces clean straight borders between sections.
 * The fill color matches the section BELOW so it looks like the bottom section
 * has an organic top edge eating into the section above.
 *
 * flip: if true, flips vertically (use at bottom of a section instead of top)
 */
export function RoughEdge({
  className,
  flip = false
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        className="w-full h-[8px] md:h-[12px] lg:h-[16px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,8 C15,6 30,10 50,7 C70,4 85,11 110,8 C135,5 150,12 175,9 C200,6 220,11 245,7
          C270,3 290,10 315,8 C340,6 360,12 385,9 C410,6 430,10 455,7 C480,4 500,11 525,8
          C550,5 570,12 595,9 C620,6 640,11 665,7 C690,3 710,10 735,8 C760,6 780,12 805,9
          C830,6 850,10 875,7 C900,4 920,11 945,8 C970,5 990,12 1015,9 C1040,6 1060,11 1085,7
          C1110,3 1130,10 1155,8 C1180,6 1195,9 1200,8 L1200,16 L0,16 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
