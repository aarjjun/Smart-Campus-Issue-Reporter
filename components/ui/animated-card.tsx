import { cn } from "@/lib/utils"

export function AnimatedCard({
    children,
    className,
    delay = 0
}: {
    children: React.ReactNode,
    className?: string,
    delay?: number
}) {
    // "delay" is kept to avoid breaking props interface, but ignored for motion.
    return (
        <div
            className={cn(
                "bg-white rounded-lg border border-neutral-200 p-6 shadow-sm",
                className
            )}
        >
            {children}
        </div>
    )
}
