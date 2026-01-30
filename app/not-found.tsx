import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-neutral-900">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">404</h1>
            <p className="text-neutral-500 mb-8">Page not found.</p>
            <Button asChild className="rounded-full">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
