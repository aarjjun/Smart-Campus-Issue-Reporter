import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            {/* 
        Main content area adjusted for sidebar width. 
        Start with generic padding for mobile, then md:pl-[280px] or md:pl-[80px] 
        depending on state (complicated to sync server/client state perfectly without context, 
        so we'll stick to a safe responsive margin). 
        
        Ideally, we'd use a Context to toggle padding, but for now we'll assume expanded 
        sidebar width on desktop as default for layout stability.
      */}
            <main className="flex-1 w-full md:pl-[280px] transition-all duration-300 ease-in-out">
                {/* Top Spacer for mobile trigger */}
                <div className="h-16 md:hidden" />
                {children}
            </main>
        </div>
    )
}
