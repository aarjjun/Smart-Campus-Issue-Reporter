"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Status = "pending" | "in-progress" | "resolved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "text-amber-600",
  },
  "in-progress": {
    label: "In Progress",
    className: "text-blue-600",
  },
  resolved: {
    label: "Resolved",
    className: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    className: "text-red-600",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
