import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="34" height="34" rx="9" fill="url(#aureon-gradient)" />
        <path
          d="M17 8L24.5 25H20.8L19.3 21.3H14.4L15.6 18.3H18.1L16.9 15.2L12.9 25H9.2L17 8Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="aureon-gradient"
            x1="0"
            y1="0"
            x2="34"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f5b942" />
            <stop offset="1" stopColor="#e8763a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-tight">
        <div className="text-sm font-bold tracking-wide text-foreground">
          AUREON
        </div>
        <div className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">
          CAPITAL AI
        </div>
      </div>
    </div>
  );
}
