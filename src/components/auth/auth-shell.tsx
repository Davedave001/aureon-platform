import type { ReactNode } from "react";
import { Logo } from "@/components/layout/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center bg-black p-4"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='none' stroke='rgba(233,219,180,0.06)' stroke-width='1'/%3E%3C/svg%3E\")",
      }}
    >
      <div className="relative w-full max-w-sm">
        {/* soft gold glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative rounded-2xl border border-primary/20 bg-card/80 p-6 shadow-[inset_0_1px_0_rgba(233,219,180,0.08),0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <Logo />
            <h1 className="mt-5 text-xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
