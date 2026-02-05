import { Navbar } from "../components/layout/Navbar"
import { Hero } from "../components/layout/Hero"
import { Features } from "../components/layout/Features"
import { HowItWorks } from "../components/layout/HowItWorks"
import { Pricing } from "../components/layout/Pricing"

export function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing />
            </main>

            {/* Simple Footer Placeholder */}
            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/10">
                <p>&copy; 2024 ClipGenius. All rights reserved.</p>
            </footer>
        </div>
    )
}
