import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  viewAllHref,
  children,
  className,
}: {
  title: string;
  viewAllHref?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("gap-3 py-4", className)}>
      <CardHeader className="flex items-center justify-between px-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="flex items-center text-xs font-medium text-primary hover:underline"
          >
            View all
            <Icon icon="mdi:chevron-right" className="size-3.5" />
          </Link>
        ) : null}
      </CardHeader>
      <CardContent className="px-4">{children}</CardContent>
    </Card>
  );
}
