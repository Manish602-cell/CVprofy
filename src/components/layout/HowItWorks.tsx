import { motion } from "framer-motion"
import { Upload, Wand2, Download, PlayCircle } from "lucide-react"

const steps = [
    {
        id: 1,
        title: "Upload Video",
        description: "Drag & drop your raw footage or paste a YouTube link. We support MP4, MOV, and more.",
        icon: Upload,
        color: "bg-blue-500"
    },
    {
        id: 2,
        title: "AI Magic",
        description: "Our AI automatically generates captions, hashtags, and selects the best clips for you.",
        icon: Wand2,
        color: "bg-purple-500"
    },
    {
        id: 3,
        title: "Publish & Viral",
        description: "Download your polished video with one click and share it to your favorite platforms.",
        icon: Download,
        color: "bg-pink-500"
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        3 simple steps to transform your content.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 -translate-y-1/2 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                            <div className={`size-16 rounded-2xl ${step.color} shadow-lg shadow-${step.color}/20 flex items-center justify-center mb-6 z-10`}>
                                <step.icon className="size-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>

                            {/* Step number badge */}
                            <div className="absolute top-4 right-4 text-xs font-bold text-white/20">
                                0{step.id}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
