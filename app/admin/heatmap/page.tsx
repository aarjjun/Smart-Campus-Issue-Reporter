"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Map } from "lucide-react"
import Link from "next/link"

export default function HeatmapPage() {
    return (
        <div className="h-screen flex flex-col relative bg-muted/20">
            {/* Floating Header */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-sm flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="-ml-2">
                        <Link href="/admin"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="font-semibold text-sm">Campus Issue Heatmap</h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Live Updates
                        </div>
                    </div>
                </div>

                <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-sm flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500/20" /> Low Density
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" /> High Density
                    </div>
                </div>
            </div>

            {/* Map Container Placeholder */}
            <div className="flex-1 w-full h-full flex items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/0,0,2,0,0/1280x1280?access_token=Pk')] bg-cover bg-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-muted/10" />

                {/* Simulated Hotspots */}
                <div className="absolute top-[30%] left-[40%]">
                    <div className="w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-white" />
                    </div>
                </div>

                <div className="absolute top-[60%] left-[70%]">
                    <div className="w-16 h-16 bg-orange-500/30 rounded-full blur-xl animate-pulse delay-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg border-2 border-white" />
                    </div>
                </div>

                <div className="absolute top-[45%] left-[25%]">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-300" />
                </div>

                <div className="text-center space-y-2 relative z-0 opacity-50 select-none pointer-events-none">
                    <Map className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">Interactive Map Integration Ready</p>
                </div>
            </div>
        </div>
    )
}
