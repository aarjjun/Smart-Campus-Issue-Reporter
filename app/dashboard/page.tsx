"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-12">
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-2">Overview</h1>
                <p className="text-neutral-500">Welcome back, Student.</p>
            </header>

            {/* Stats - Text Only */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 border-b border-neutral-200 pb-12">
                <div className="space-y-1">
                    <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider">Active Issues</div>
                    <div className="text-3xl font-semibold text-neutral-900">3</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider">Pending Review</div>
                    <div className="text-3xl font-semibold text-neutral-900">1</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider">Resolved</div>
                    <div className="text-3xl font-semibold text-neutral-900">12</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
                <h2 className="text-sm font-medium text-neutral-900 mb-4 uppercase tracking-wider">Actions</h2>
                <div className="flex gap-4">
                    <Button className="h-12 px-6 rounded-full bg-neutral-900 text-white shadow-none hover:bg-neutral-800" asChild>
                        <Link href="/report">Report New Issue</Link>
                    </Button>
                    <Button variant="outline" className="h-12 px-6 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-50" asChild>
                        <Link href="/issues">View All History</Link>
                    </Button>
                </div>
            </div>

            {/* Recent Activity List - No Cards */}
            <section>
                <h2 className="text-sm font-medium text-neutral-900 mb-6 uppercase tracking-wider">Recent Updates</h2>
                <div className="divide-y divide-neutral-200">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="py-4 flex items-center justify-between group">
                            <div className="flex items-baseline gap-4">
                                <span className="font-mono text-xs text-neutral-400">#29{i}</span>
                                <div>
                                    <div className="font-medium text-neutral-900 group-hover:underline decoration-neutral-300 underline-offset-4 transition-all">
                                        {i === 1 ? "Wi-Fi Connectivity in Library" : i === 2 ? "Broken Chair in Room 302" : "Water Dispenser Malfunction"}
                                    </div>
                                    <div className="text-sm text-neutral-500 mt-0.5">Reported 2 hours ago • Main Campus</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="px-2 py-1 rounded text-xs font-medium bg-neutral-100 text-neutral-600">
                                    {i === 1 ? "Investigating" : "Received"}
                                </div>
                                <Link href={`/issues/${i}`} className="p-2 text-neutral-300 hover:text-neutral-900 transition-colors">
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
