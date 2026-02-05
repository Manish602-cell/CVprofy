import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Hash, Loader2, RefreshCcw } from "lucide-react"

export function HashtagGenerator() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [hashtags, setHashtags] = useState<string[]>([])

    const handleGenerate = () => {
        setIsGenerating(true)
        // Mock API call
        setTimeout(() => {
            setIsGenerating(false)
            setHashtags([
                "#viral", "#trending", "#contentcreator", "#fyp", "#explorepage",
                "#reelsinstagram", "#youtubeshorts", "#growth", "#motivation", "#tech"
            ])
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Hashtag Generator</h2>
                <p className="text-muted-foreground">Find high-reach, viral hashtags for your niche.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 h-fit">
                    <CardHeader>
                        <CardTitle>Topic & Niche</CardTitle>
                        <CardDescription>Tell us about your content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Video Topic</Label>
                            <Input placeholder="e.g. How to grow on Instagram" className="bg-white/5 border-white/10" />
                        </div>

                        <div className="space-y-2">
                            <Label>Niche</Label>
                            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                <option>General</option>
                                <option>Technology</option>
                                <option>Fitness</option>
                                <option>Comedy</option>
                                <option>Education</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Platform</Label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 bg-white/5">Instagram</Button>
                                <Button variant="outline" className="flex-1 bg-white/5">YouTube</Button>
                            </div>
                        </div>

                        <Button variant="gradient" className="w-full mt-4" onClick={handleGenerate} disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Hash className="mr-2 size-4" />}
                            Generate Hashtags
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Results</CardTitle>
                            <CardDescription>{hashtags.length > 0 ? `${hashtags.length} hashtags found` : "Waiting for input..."}</CardDescription>
                        </div>
                        {hashtags.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={() => setHashtags([])}>
                                <RefreshCcw className="size-4" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {hashtags.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/10 rounded-lg">
                                <Hash className="size-10 mb-4 opacity-50" />
                                <p>Enter a topic to generate tags</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-green-400">High Reach (1M+)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hashtags.slice(0, 5).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-blue-400">Niche Specific</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hashtags.slice(5).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Button variant="secondary" className="w-full">
                                    <Copy className="mr-2 size-4" /> Copy All
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
