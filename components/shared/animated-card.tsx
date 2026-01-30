"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "rounded-lg border bg-card p-6",
        hover && "hover:bg-muted/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
