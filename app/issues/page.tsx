"use client"

import { AnimatedCard } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function IssuesPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">My Issues</h1>
                    <p className="text-muted-foreground">Track the status of problems you&apos;ve reported.</p>
                </div>
                <Button asChild><Link href="/report">New Report</Link></Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-card p-2 rounded-xl border">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-9 bg-transparent border-0 focus-visible:ring-0" placeholder="Search issues..." />
                </div>
                <div className="h-6 w-px bg-border" />
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Issues Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <IssueCard key={i} index={i} />
                ))}
            </div>
        </div>
    )
}

function IssueCard({ index }: { index: number }) {
    const status = index % 3 === 0 ? "resolved" : index % 2 === 0 ? "inprogress" : "open"

    return (
        <Link href={`/issues/${index}`}>
            <AnimatedCard delay={index * 0.05} className="h-full hover:border-primary/50 group">
                <div className="flex justify-between items-start mb-4">
                    <Badge variant={status as any}>
                        {status === "resolved" ? "Resolved" : status === "inprogress" ? "In Progress" : "Open"}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">#240{index}</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {index % 2 === 0 ? "Water Leak in Science Block" : "Broken Projector in A-201"}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    The projector has been flickering for the last 2 days and now it won&apos;t turn on at all during lectures.
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Block A
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        2d ago
                    </div>
                </div>
            </AnimatedCard>
        </Link>
    )
}
