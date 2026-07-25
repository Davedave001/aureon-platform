"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Logo } from "./logo";
import { primaryNav, secondaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { initialsOf, roleLabel } from "@/lib/user-display";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/12 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon icon={icon} className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function SidebarContent() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const displayName =
    session?.user?.name ?? session?.user?.email ?? "Account";
  const displayRole = roleLabel(session?.user?.role);
  const displayInitials = initialsOf(
    session?.user?.name,
    session?.user?.email
  );

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {primaryNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}

        <div className="my-2 border-t border-sidebar-border" />

        {secondaryNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </nav>

      <div className="space-y-3 p-3">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4">
          <Icon icon="mdi:crown-outline" className="size-5 text-gold" />
          <p className="mt-2 text-sm font-semibold text-foreground">
            Upgrade to Pro
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Unlock premium tools, AI insights, and more.
          </p>
          <Button size="sm" className="mt-3 w-full">
            Upgrade Now
          </Button>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border p-2.5">
          <Link href="/profile" className="min-w-0 flex-1">
            <span className="flex items-center gap-2.5">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                  {displayInitials}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-sm font-medium text-foreground">
                  {displayName}
                </span>
                <span className="block truncate text-xs text-gold">
                  {displayRole}
                </span>
              </span>
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Account menu"
              className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon icon="mdi:dots-horizontal" className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem render={<Link href="/profile" />}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/settings" />}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/billing" />}>
                  Billing Centre
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
      <SidebarContent />
    </aside>
  );
}
