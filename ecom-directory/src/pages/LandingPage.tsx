import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories } from '@/data/categories'
import { ArrowRight, Search, Lock, Zap, Database, Mail } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInWithOtp, setPendingEmail } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    setPendingEmail(email)
    const { error: authError } = await signInWithOtp(email)
    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    navigate('/verify')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <nav className="border-b border-zinc-800/60 backdrop-blur-sm sticky top-0 z-50 bg-zinc-950/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
              <Database className="w-4 h-4 text-zinc-950" />
            </div>
            <span className="font-semibold text-lg tracking-tight">eCom Stack</span>
          </div>
          <span className="text-sm text-zinc-500">The Ecommerce Directory</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>200+ vetted tools, services & platforms</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Every tool you need to{' '}
            <span className="text-amber-400">sell online</span>
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl">
            The curated directory of ecommerce platforms, payment processors, shipping providers, marketing tools, creative services, and everything in between. Stop googling — start building.
          </p>

          {/* Email Gate */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-lg">
            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
              <Lock className="w-4 h-4" />
              <span>Free access — just verify your email</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 pl-10 h-12 text-base placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold h-12 px-6 shrink-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Get Access <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            <p className="text-xs text-zinc-600 mt-4">
              We'll send a 6-digit code to verify your email. No spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Category Preview */}
      <section className="border-t border-zinc-800/60 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-5 h-5 text-zinc-500" />
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Browse 12 categories</h2>
          </div>
          <h3 className="text-3xl font-bold tracking-tight mb-12">What's inside the directory</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="group bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h4 className="font-semibold text-zinc-100 mb-1">{cat.name}</h4>
                    <p className="text-sm text-zinc-500 mb-3">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.slice(0, 3).map(sub => (
                        <span key={sub} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded">
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories.length > 3 && (
                        <span className="text-xs px-2 py-0.5 text-zinc-600">
                          +{cat.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-1">200+</div>
              <div className="text-sm text-zinc-500">Vetted listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-1">12</div>
              <div className="text-sm text-zinc-500">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-1">Free</div>
              <div className="text-sm text-zinc-500">Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} eCom Stack. Built for online sellers.
        </div>
      </footer>
    </div>
  )
}
