"use client"

import Link from "next/link"
import { AlertCircle, CheckCircle2, Circle, Clock } from "lucide-react"

import { cn } from "@/lib/utils"

interface IssueRowProps {
    id: string
    title: string
    status: "open" | "in-progress" | "resolved" | "urgent"
    location: string
    date: string
}

const statusMap = {
    open: { icon: Circle, color: "text-muted-foreground", label: "Open" },
    "in-progress": { icon: Clock, color: "text-blue-500", label: "In Progress" },
    resolved: { icon: CheckCircle2, color: "text-emerald-500", label: "Resolved" },
    urgent: { icon: AlertCircle, color: "text-red-500", label: "Urgent" },
}

export function IssueRow({ id, title, status, location, date }: IssueRowProps) {
    const statusConfig = statusMap[status]
    const StatusIcon = statusConfig.icon

    return (
        <Link
            href={`/issues/${id}`}
            className="group grid grid-cols-12 gap-4 items-center py-4 px-2 border-b border-border/40 hover:bg-muted/30 transition-colors"
        >
            <div className="col-span-1 text-xs text-muted-foreground font-mono">#{id}</div>
            <div className="col-span-6 font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {title}
            </div>
            <div className="col-span-2 flex items-center gap-2">
                <StatusIcon className={cn("w-3.5 h-3.5", statusConfig.color)} />
                <span className="text-xs text-muted-foreground">{statusConfig.label}</span>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground truncate">{location}</div>
            <div className="col-span-1 text-xs text-muted-foreground text-right">{date}</div>
        </Link>
    )
}
