"use client"

import { AnimatedCard } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Overview</h1>
                    <p className="text-muted-foreground">Monitor campus health and issue resolution metrics.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline">Export Report</Button>
                    <Button asChild><Link href="/admin/heatmap">View Heatmap</Link></Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Issues"
                    value="1,284"
                    trend="+12%"
                    icon={BarChart3}
                    delay={0}
                />
                <StatsCard
                    title="Resolution Time"
                    value="4.2h"
                    trend="-8%"
                    positive
                    icon={Clock}
                    delay={0.1}
                />
                <StatsCard
                    title="Resolved Today"
                    value="24"
                    trend="+4"
                    icon={CheckCircle2}
                    delay={0.2}
                />
                <StatsCard
                    title="Critical Alerts"
                    value="3"
                    trend="Active"
                    trendColor="text-red-500"
                    icon={AlertTriangle}
                    delay={0.3}
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Issues List - Takes 2/3 */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <AnimatedCard key={i} className="flex items-center justify-between p-4 py-3" delay={i * 0.05}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                        #24{i}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Main Hall Light Malfunction</div>
                                        <div className="text-xs text-muted-foreground">Reported 2h ago by John Doe</div>
                                    </div>
                                </div>
                                <Badge variant={i % 2 === 0 ? "open" : "inprogress"}>
                                    {i % 2 === 0 ? "Open" : "In Progress"}
                                </Badge>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>

                {/* Chart Placeholder / Categories - Takes 1/3 */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
                    <AnimatedCard className="h-[400px] flex items-center justify-center bg-muted/20 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <span>Chart Visualization Placeholder</span>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    )
}

function StatsCard({ title, value, trend, trendColor, positive, icon: Icon, delay }: any) {
    return (
        <AnimatedCard delay={delay}>
            <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-muted", trendColor || (positive ? "text-emerald-600 bg-emerald-50" : "text-muted-foreground"))}>
                    {trend}
                </span>
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
        </AnimatedCard>
    )
}
