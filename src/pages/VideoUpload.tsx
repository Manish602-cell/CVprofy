import { useState, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileVideo, X, Settings2 } from "lucide-react"

export function VideoUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true)
        } else if (e.type === "dragleave") {
            setIsDragging(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Upload Video</h2>
                <p className="text-muted-foreground">Upload your raw footage to start the magic.</p>
            </div>

            {!file ? (
                <Card
                    className={`border-2 border-dashed transition-colors duration-200 ${isDragging ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-black/20"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Upload className="size-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Drag & drop your video here</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Supports MP4, MOV, and AVI up to 500MB. Max duration 60 seconds.
                        </p>
                        <div className="relative">
                            <input
                                type="file"
                                id="video-upload"
                                className="hidden"
                                accept="video/*"
                                onChange={handleChange}
                            />
                            <Button variant="gradient" onClick={() => document.getElementById('video-upload')?.click()}>
                                Browse Files
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-16 rounded-lg bg-black flex items-center justify-center border border-white/10">
                                    <FileVideo className="size-8 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{file.name}</h4>
                                    <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                                <X className="size-5" />
                            </Button>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <Button variant="outline">Preview</Button>
                            <Button variant="gradient" className="gap-2">
                                <Settings2 className="size-4" />
                                Continue to Editing
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
