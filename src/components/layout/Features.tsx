import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Type, Hash, Image as ImageIcon, Video, Zap, Wand2 } from "lucide-react"

const features = [
    {
        title: "AI Auto Captions",
        description: "Generate accurate, animated captions in multiple languages instantly. Style them to match your brand.",
        icon: Type,
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "Viral Hashtags",
        description: "Get trending hashtags tailored to your niche (Fitness, Tech, Comedy) to maximize reach.",
        icon: Hash,
        color: "text-pink-400",
        gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
        title: "Smart Thumbnails",
        description: "Create click-worthy thumbnails with AI that analyzes your video emotion and content.",
        icon: ImageIcon,
        color: "text-purple-400",
        gradient: "from-purple-500/20 to-violet-500/20"
    },
    {
        title: "Magic Editing",
        description: "Trim, cut, and polish your shorts with intelligent editing tools designed for speed.",
        icon: Wand2,
        color: "text-amber-400",
        gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
        title: "Multi-Platform",
        description: "Optimize one video for Instagram Reels, YouTube Shorts, and TikTok simultaneously.",
        icon: Video,
        color: "text-green-400",
        gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
        title: "Instant Export",
        description: "Render high-quality 4K videos in seconds with our optimized cloud rendering engine.",
        icon: Zap,
        color: "text-cyan-400",
        gradient: "from-cyan-500/20 to-sky-500/20"
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything You Need to <span className="gradient-text">Go Viral</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Stop juggling multiple apps. ClipGenius gives you all the tools to produce professional short-form content in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-colors duration-300 group">
                                <CardHeader>
                                    <div className={`size-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className={`size-6 ${feature.color}`} />
                                    </div>
                                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
