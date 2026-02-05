import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, Edit2, Image as ImageIcon, Loader2 } from "lucide-react"

export function ThumbnailGenerator() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [thumbnails, setThumbnails] = useState<number[]>([])

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setThumbnails([1, 2, 3])
        }, 2000)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">AI Thumbnails</h2>
                <p className="text-muted-foreground">Generate click-worthy thumbnails that grab attention.</p>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Video Title</Label>
                            <Input placeholder="MUST WATCH! My Secret Strategy..." className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Emotion / Style</Label>
                            <div className="flex gap-2">
                                {["Shocked 😲", "Happy 😄", "Angry 😡"].map(emotion => (
                                    <button key={emotion} className="flex-1 px-3 py-2 rounded-md border border-white/10 bg-black/20 hover:bg-white/5 text-sm transition-colors">
                                        {emotion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Button variant="gradient" className="mt-6 w-full md:w-auto" onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon className="mr-2 size-4" />}
                        Generate Thumbnails
                    </Button>
                </CardContent>
            </Card>

            {thumbnails.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {thumbnails.map((i) => (
                        <Card key={i} className="bg-white/5 border-white/10 overflow-hidden group">
                            <div className="aspect-video bg-gray-900 relative">
                                {/* Mock Thumbnail Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transform -rotate-6">
                                        VIRAL!
                                    </span>
                                </div>
                                {/* Face placeholder */}
                                <div className="absolute bottom-0 right-0 w-1/2 h-4/5 bg-gray-500/50 rounded-tl-3xl backdrop-blur-sm" />
                            </div>
                            <CardFooter className="p-4 flex gap-2">
                                <Button variant="outline" className="flex-1 bg-transparent border-white/10">
                                    <Edit2 className="mr-2 size-4" /> Edit
                                </Button>
                                <Button variant="secondary" size="icon">
                                    <Download className="size-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
