"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUp, ArrowDown, Minus } from "lucide-react";

type Priority = "critical" | "high" | "medium" | "low";

interface PriorityPillProps {
  priority: Priority;
  showIcon?: boolean;
  className?: string;
}

const priorityConfig: Record<
  Priority,
  { label: string; className: string; icon: typeof AlertTriangle }
> = {
  critical: {
    label: "Critical",
    className: "text-red-600",
    icon: AlertTriangle,
  },
  high: {
    label: "High",
    className: "text-orange-600",
    icon: ArrowUp,
  },
  medium: {
    label: "Medium",
    className: "text-yellow-600",
    icon: Minus,
  },
  low: {
    label: "Low",
    className: "text-slate-600",
    icon: ArrowDown,
  },
};

export function PriorityPill({
  priority,
  showIcon = true,
  className,
}: PriorityPillProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}
