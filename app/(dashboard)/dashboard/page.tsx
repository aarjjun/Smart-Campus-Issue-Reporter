"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/shared/animated-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { PriorityPill } from "@/components/shared/priority-pill";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

const stats = [
  {
    label: "Total Reports",
    value: "12",
    icon: FileText,
    trend: "+3 this week",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  {
    label: "Pending",
    value: "4",
    icon: Clock,
    trend: "2 urgent",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  {
    label: "In Progress",
    value: "5",
    icon: TrendingUp,
    trend: "Being handled",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  {
    label: "Resolved",
    value: "3",
    icon: CheckCircle2,
    trend: "This month",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
];

const recentIssues = [
  {
    id: "1",
    title: "Broken street light near Library",
    status: "in-progress" as const,
    priority: "high" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    title: "Water leakage in Science Building",
    status: "pending" as const,
    priority: "critical" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    title: "Pothole on Main Road",
    status: "resolved" as const,
    priority: "medium" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your reports
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/report" className="gap-2">
            <Plus className="h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <AnimatedCard key={stat.label} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Recent Issues */}
      <AnimatedCard hover={false} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Issues</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/issues" className="gap-1 text-primary">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {recentIssues.map((issue, index) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.id}`}
              className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-primary transition-colors">
                  {issue.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatRelativeTime(issue.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <PriorityPill priority={issue.priority} />
                <StatusBadge status={issue.status} />
              </div>
            </Link>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatedCard>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Emergency Mode</h3>
              <p className="text-sm text-muted-foreground">
                Report critical issues instantly
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/emergency">Open</Link>
            </Button>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                View all your submitted issues
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/issues">View</Link>
            </Button>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
