import { Button } from "../ui/button"
import { Video, Wand2 } from "lucide-react"

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Video className="text-white size-4" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">ClipGenius</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
                    <Button variant="gradient" className="gap-2 group">
                        Get Started
                        <Wand2 className="size-4 transition-transform group-hover:rotate-12" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
