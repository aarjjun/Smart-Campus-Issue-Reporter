"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}

const variants = {
  default: "bg-primary",
  success: "bg-emerald-600",
  warning: "bg-amber-600",
  danger: "bg-red-600",
};

const sizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = "md",
  variant = "default",
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizes[size]
        )}
      >
        <div
          className={cn("h-full rounded-full", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  labels,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full", index < currentStep ? "bg-primary" : "bg-muted")}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {labels && labels.length === totalSteps && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span
              key={label}
              className={cn(
                "text-xs",
                index <= currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
              style={{
                width: `${100 / totalSteps}%`,
                textAlign: index === 0 ? "left" : index === totalSteps - 1 ? "right" : "center",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
