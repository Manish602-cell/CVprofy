import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Clock, FileVideo } from "lucide-react"

export function DashboardHome() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Creator! Here's what's happening today.</p>
                </div>
                <Button variant="gradient">
                    <Plus className="mr-2 size-4" />
                    New Project
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Projects", value: "12", icon: FileVideo, change: "+2 this week" },
                    { label: "Videos Generated", value: "48", icon: TrendingUp, change: "+15% from last month" },
                    { label: "Hours Saved", value: "24h", icon: Clock, change: "Vs manual editing" },
                    { label: "Storage Used", value: "45%", icon: FileVideo, change: "45GB / 100GB" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Projects */}
                <Card className="col-span-4 bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                        <CardDescription>
                            You have 3 active projects.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-colors border border-white/5">
                                    <div className="h-12 w-20 bg-gray-800 rounded-md shrink-0 animate-pulse" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate">Viral TikTok Video #{i}</h4>
                                        <p className="text-xs text-muted-foreground">Edited 2 hours ago</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">Draft</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="col-span-3 bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Quick Tools</CardTitle>
                        <CardDescription>
                            Jump straight into creation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {[
                            "Auto Caption Generator",
                            "Viral Hashtag Finder",
                            "Thumbnail Creator"
                        ].map((tool) => (
                            <Button key={tool} variant="outline" className="w-full justify-start h-auto py-4 bg-black/20 border-white/5 hover:bg-white/5">
                                <span className="text-left font-medium">{tool}</span>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
