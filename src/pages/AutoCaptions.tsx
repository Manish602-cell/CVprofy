import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Download, Copy, Play } from "lucide-react"

export function AutoCaptions() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [generated, setGenerated] = useState(false)

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setGenerated(true)
        }, 2000)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">AI Auto Captions</h2>
                <p className="text-muted-foreground">Generate accurate captions in any language with one click.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Controls */}
                <Card className="lg:col-span-1 bg-white/5 border-white/10 h-fit">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>Customize your captions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Source Language</Label>
                            <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>English (US)</option>
                                <option>Hindi</option>
                                <option>Hinglish</option>
                                <option>Spanish</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Caption Style</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {["Classic", "Bold", "Emoji", "Karaoke"].map((style) => (
                                    <div key={style} className="cursor-pointer border border-white/10 rounded-md p-3 text-center bg-black/20 hover:bg-white/10 hover:border-white/20 transition-all">
                                        <span className="text-sm font-medium">{style}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="gradient"
                            className="w-full"
                            onClick={handleGenerate}
                            disabled={isGenerating || generated}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Processing Video...
                                </>
                            ) : (
                                "Generate Captions"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Preview Area */}
                <Card className="lg:col-span-2 bg-black border-white/10 overflow-hidden flex flex-col">
                    <div className="flex-1 min-h-[400px] relative bg-gray-900 flex items-center justify-center">
                        {!generated ? (
                            <div className="text-center text-muted-foreground p-6">
                                <div className="size-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                                    <Play className="size-6 ml-1" />
                                </div>
                                <p>Video Preview Area</p>
                                <p className="text-sm opacity-60">Upload a video or select a project to preview.</p>
                            </div>
                        ) : (
                            <div className="relative w-full h-full">
                                {/* Mock Video Layer */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end justify-center pb-20">
                                    {/* Mock Caption Overlay */}
                                    <div className="text-center px-8">
                                        <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg text-2xl font-bold text-yellow-400 border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                                            Wait for the drop! 🎵🔥
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {generated && (
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm">Transcript</h4>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="h-8"><Copy className="size-3 mr-2" /> Copy</Button>
                                    <Button size="sm" variant="ghost" className="h-8"><Download className="size-3 mr-2" /> SRT</Button>
                                </div>
                            </div>
                            <div className="h-32 overflow-y-auto text-sm text-muted-foreground space-y-2 pr-2">
                                <p><span className="text-blue-400">[00:00]</span> Welcome to another video!</p>
                                <p><span className="text-blue-400">[00:03]</span> Today we are going to learn how to create viral content.</p>
                                <p><span className="text-blue-400">[00:07]</span> Ideally, you want to hook the audience in the first 3 seconds.</p>
                                <p><span className="text-blue-400">[00:12]</span> <span className="text-yellow-400 font-bold">Wait for the drop!</span></p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
