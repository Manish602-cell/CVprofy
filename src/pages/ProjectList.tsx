import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Calendar, FileVideo, MoreVertical, Play } from "lucide-react";

export function ProjectList() {
    const navigate = useNavigate();

    // Mock projects data
    const projects = [
        {
            id: 1,
            title: "My Viral Gym Reel",
            date: "2024-03-10",
            status: "Draft",
            thumbnail: "bg-red-500/20",
        },
        {
            id: 2,
            title: "Tech Review - iPhone 16",
            date: "2024-03-08",
            status: "Published",
            thumbnail: "bg-blue-500/20",
        },
        {
            id: 3,
            title: "Travel Vlog - Bali",
            date: "2024-03-05",
            status: "Processing",
            thumbnail: "bg-green-500/20",
        },
        {
            id: 4,
            title: "Funny Cat Compilation",
            date: "2024-03-01",
            status: "Published",
            thumbnail: "bg-yellow-500/20",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">My Projects</h2>
                    <p className="text-muted-foreground">Manage and edit your video projects.</p>
                </div>
                <Button variant="gradient" onClick={() => navigate("/dashboard/upload")}>
                    Create New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="bg-white/5 border-white/10 overflow-hidden group hover:border-white/20 transition-all">
                        {/* Thumbnail */}
                        <div className={`aspect-video w-full ${project.thumbnail} relative group-hover:opacity-90 transition-opacity`}>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                                    <Play className="h-6 w-6 ml-1" />
                                </Button>
                            </div>
                            <div className="absolute top-2 right-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white rounded-full">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg truncate pr-2" title={project.title}>
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar className="mr-2 h-3.5 w-3.5" />
                                {project.date}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full border ${project.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        project.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button variant="outline" className="flex-1 h-9 text-sm" onClick={() => navigate("/dashboard/captions")}>
                                <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit
                            </Button>
                            <Button variant="ghost" className="h-9 px-3 text-muted-foreground hover:text-red-400 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
