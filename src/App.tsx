import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { DashboardHome } from './pages/DashboardHome'
import { VideoUpload } from './pages/VideoUpload'
import { AutoCaptions } from './pages/AutoCaptions'
import { HashtagGenerator } from './pages/HashtagGenerator'
import { ThumbnailGenerator } from './pages/ThumbnailGenerator'
import { ProjectList } from './pages/ProjectList'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
                <Route path="/dashboard/upload" element={<DashboardLayout><VideoUpload /></DashboardLayout>} />
                <Route path="/dashboard/captions" element={<DashboardLayout><AutoCaptions /></DashboardLayout>} />
                <Route path="/dashboard/hashtags" element={<DashboardLayout><HashtagGenerator /></DashboardLayout>} />
                <Route path="/dashboard/thumbnails" element={<DashboardLayout><ThumbnailGenerator /></DashboardLayout>} />
                <Route path="/dashboard/projects" element={<DashboardLayout><ProjectList /></DashboardLayout>} />

                <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
