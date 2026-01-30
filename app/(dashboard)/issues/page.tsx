"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { PriorityPill } from "@/components/shared/priority-pill";
import { EmptyState } from "@/components/shared/empty-state";
import { CardSkeleton } from "@/components/shared/skeleton-loader";
import { Search, FileText, Plus } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

type Status = "pending" | "in-progress" | "resolved" | "rejected";
type Priority = "critical" | "high" | "medium" | "low";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: string;
  createdAt: Date;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Broken street light near Library",
    description: "The street light near the main library entrance has been flickering for days.",
    status: "in-progress",
    priority: "high",
    category: "Electrical",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    title: "Water leakage in Science Building",
    description: "There's a significant water leak in the second floor bathroom.",
    status: "pending",
    priority: "critical",
    category: "Plumbing",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    title: "Pothole on Main Road",
    description: "Large pothole near the parking area entrance causing safety hazard.",
    status: "resolved",
    priority: "medium",
    category: "Infrastructure",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "4",
    title: "AC not working in Lecture Hall 5",
    description: "The air conditioning unit in LH-5 stopped working yesterday.",
    status: "in-progress",
    priority: "medium",
    category: "Electrical",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

const statusFilters: { label: string; value: Status | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Resolved", value: "resolved" },
];

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Status | "all">("all");
  const [isLoading] = useState(false);

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || issue.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Issues</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your reported issues
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/report" className="gap-2">
            <Plus className="h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className="shrink-0"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Issues List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filteredIssues.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No issues found"
          description={
            searchQuery
              ? "Try adjusting your search or filters"
              : "You haven't reported any issues yet"
          }
          actionLabel="Report an Issue"
          onAction={() => (window.location.href = "/report")}
        />
      ) : (
        <div className="space-y-4">
          {filteredIssues.map((issue, index) => (
            <div key={issue.id}>
              <Link href={`/issues/${issue.id}`}>
                <div className="group border-b border-muted p-4 hover:bg-muted transition-all duration-200">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {issue.category} • {formatRelativeTime(issue.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <PriorityPill priority={issue.priority} />
                      <StatusBadge status={issue.status} />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {issue.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
