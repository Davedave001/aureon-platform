"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Portals need the DOM — only render the overlay after mount to avoid an
  // SSR/hydration mismatch. One-time mount flag; the lint heuristic that warns
  // about setState-in-effect doesn't apply to this intentional pattern.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close the drawer when the route changes (e.g. after tapping a nav link).
  // React's "adjust state during render" pattern — no effect needed.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay = (
    <div className="lg:hidden">
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{ backgroundColor: "var(--sidebar)" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-sidebar-border shadow-2xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-3 z-10 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon icon="mdi:close" className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
      >
        <Icon icon="mdi:menu" className="size-5" />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
