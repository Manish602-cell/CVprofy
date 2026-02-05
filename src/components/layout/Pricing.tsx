import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Check } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-muted-foreground text-lg">
                        Start for free, upgrade when you go viral.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full bg-white/5 border-white/10 flex flex-col">
                            <CardHeader className="text-center border-b border-white/5 pb-8">
                                <h3 className="text-2xl font-bold mb-2">Creator Free</h3>
                                <div className="text-4xl font-bold mb-2">₹0<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                                <p className="text-muted-foreground">Perfect for trying out the magic</p>
                            </CardHeader>
                            <CardContent className="flex-1 pt-8">
                                <ul className="space-y-4">
                                    {[
                                        "3 Videos per month",
                                        "720p Export Quality",
                                        "Basic Captions",
                                        "Standard Thumbnails",
                                        "Contains Watermark"
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="size-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <Check className="size-3 text-white" />
                                            </div>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">Get Started</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-50 blur-lg" />

                        <Card className="relative h-full bg-gray-900 border-white/10 flex flex-col">
                            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg" />
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                                POPULAR
                            </div>
                            <CardHeader className="text-center border-b border-white/5 pb-8">
                                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Pro Creator</h3>
                                <div className="text-4xl font-bold mb-2">₹299<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                                <p className="text-muted-foreground">For serious content creators</p>
                            </CardHeader>
                            <CardContent className="flex-1 pt-8">
                                <ul className="space-y-4">
                                    {[
                                        "Unlimited Videos",
                                        "4K Export Quality",
                                        "Premium AI Captions",
                                        "Viral Hashtags & Thumbnails",
                                        "No Watermark",
                                        "Priority Support"
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="size-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                                                <Check className="size-3 text-white" />
                                            </div>
                                            <span className="text-white">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="gradient" className="w-full">Upgrade to Pro</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
