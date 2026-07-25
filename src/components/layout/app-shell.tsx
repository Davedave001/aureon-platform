import type { ReactNode } from "react";
import { Sidebar, SidebarContent } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileNav } from "./mobile-nav";

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          subtitle={subtitle}
          nav={
            <MobileNav>
              <SidebarContent />
            </MobileNav>
          }
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
