import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react'
import { Database } from 'lucide-react'

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resent, setResent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { pendingEmail, verifyOtp, signInWithOtp, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/directory')
  }, [user, navigate])

  useEffect(() => {
    if (!pendingEmail) navigate('/')
  }, [pendingEmail, navigate])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const chars = value.replace(/\D/g, '').split('').slice(0, 6)
      const newCode = [...code]
      chars.forEach((char, i) => {
        if (index + i < 6) newCode[index + i] = char
      })
      setCode(newCode)
      const nextIndex = Math.min(index + chars.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const token = code.join('')
    if (token.length !== 6) {
      setError('Enter the full 6-digit code.')
      return
    }

    if (!pendingEmail) {
      navigate('/')
      return
    }

    setLoading(true)
    const { error: verifyError } = await verifyOtp(pendingEmail, token)
    setLoading(false)

    if (verifyError) {
      setError('Invalid or expired code. Check your email and try again.')
      return
    }
  }

  const handleResend = async () => {
    if (!pendingEmail) return
    setResent(false)
    await signInWithOtp(pendingEmail)
    setResent(true)
    setTimeout(() => setResent(false), 5000)
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
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 pt-24">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Check your email</h1>
          <p className="text-zinc-400">
            We sent a 6-digit verification code to{' '}
            <span className="text-zinc-200 font-medium">{pendingEmail}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2.5 justify-center mb-6">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-semibold bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 transition-all"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          {resent && (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>New code sent!</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || code.join('').length !== 6}
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold h-12"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              'Verify & Access Directory'
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResend}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Didn't receive a code? <span className="underline">Resend</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 text-center mt-8">
          The code expires in 10 minutes. Check your spam folder if you don't see it.
        </p>
      </div>
    </div>
  )
}
