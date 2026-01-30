"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react"

export default function EmergencyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle red pulse background to indicate urgency without being blinding */}
            <div className="absolute inset-0 bg-destructive/5 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[500px] h-[500px] bg-destructive/20 rounded-full blur-3xl pulse-ring"></div>
            </div>

            <div className="relative z-10 max-w-md w-full text-center space-y-12">
                <div>
                    <div className="inline-flex items-center justify-center p-4 bg-destructive/10 text-destructive rounded-full mb-6">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-foreground">
                        Emergency Mode
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Use this for immediate threats to safety, fire, or medical emergencies.
                        This will alert campus security immediately.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button
                        size="lg"
                        className="w-full h-16 text-lg font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 scale-100 hover:scale-[1.02] transition-transform"
                    >
                        <Phone className="w-5 h-5 mr-3" />
                        Call Campus Security
                    </Button>

                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full h-14 text-lg"
                    >
                        Report Active Hazard
                    </Button>
                </div>

                <div>
                    <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                        Return to non-emergency workspace
                    </Link>
                </div>
            </div>
        </div>
    )
}
