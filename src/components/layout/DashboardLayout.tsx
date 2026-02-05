import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Upload,
    Type,
    Hash,
    Image as ImageIcon,
    FolderOpen,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Upload Video', icon: Upload, path: '/dashboard/upload' },
        { label: 'Auto Captions', icon: Type, path: '/dashboard/captions' },
        { label: 'Hashtags', icon: Hash, path: '/dashboard/hashtags' },
        { label: 'Thumbnails', icon: ImageIcon, path: '/dashboard/thumbnails' },
        { label: 'My Projects', icon: FolderOpen, path: '/dashboard/projects' },
    ]

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white text-lg">C</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">ClipGenius</span>
                    </Link>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Image = item.icon
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white border border-white/10"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Image className={cn("size-4", isActive ? "text-blue-400" : "text-muted-foreground")} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/dashboard/settings"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <Settings className="size-4" />
                        Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                        <LogOut className="size-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="size-5" />
                        </Button>
                        {/* Search (Desktop) */}
                        <div className="hidden md:flex relative max-w-sm w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search projects..."
                                className="pl-9 h-9 bg-white/5 border-white/10 w-64 focus-visible:ring-1 focus-visible:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                            <Bell className="size-5" />
                        </Button>
                        <div className="size-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
