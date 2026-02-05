import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[128px]" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[128px]" />
            </div>

            <div className="container relative mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8"
                >
                    <Sparkles className="size-4 text-purple-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        AI-Powered Video Creation
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    Create Viral <span className="gradient-text">Reels & Shorts</span>
                    <br /> with AI Magic
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Generate auto captions, viral hashtags, and eye-catching thumbnails in seconds.
                    The ultimate toolkit for modern creators.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" variant="gradient" className="h-12 px-8 text-base shadow-purple-500/25 shadow-xl">
                        Start Creating Free
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                        <Play className="mr-2 size-4" />
                        Watch Demo
                    </Button>
                </motion.div>

                {/* Floating elements mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-4 shadow-2xl"
                >
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-black overflow-hidden flex items-center justify-center border border-white/5">
                        <span className="text-muted-foreground">App Interface Preview</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
