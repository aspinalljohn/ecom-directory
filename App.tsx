import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import LandingPage from '@/pages/LandingPage'
import VerifyPage from '@/pages/VerifyPage'
import DirectoryPage from '@/pages/DirectoryPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, demoMode } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="w-5 h-5 border-2 border-zinc-600 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user && !demoMode) return <Navigate to="/" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, demoMode } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="w-5 h-5 border-2 border-zinc-600 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (user || demoMode) return <Navigate to="/directory" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/directory" element={<ProtectedRoute><DirectoryPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
