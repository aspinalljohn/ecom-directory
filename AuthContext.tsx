import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  emailSent: boolean
  pendingEmail: string | null
  demoMode: boolean
}

interface AuthContextType extends AuthState {
  signInWithOtp: (email: string) => Promise<{ error: Error | null }>
  verifyOtp: (email: string, token: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  setPendingEmail: (email: string) => void
  enterDemoMode: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: !isSupabaseConfigured ? false : true,
    emailSent: false,
    pendingEmail: null,
    demoMode: !isSupabaseConfigured,
  })

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(s => ({
        ...s,
        session,
        user: session?.user ?? null,
        loading: false,
      }))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(s => ({
        ...s,
        session,
        user: session?.user ?? null,
        loading: false,
      }))
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithOtp = async (email: string) => {
    if (!isSupabaseConfigured) {
      setState(s => ({ ...s, emailSent: true, pendingEmail: email }))
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })
    if (!error) {
      setState(s => ({ ...s, emailSent: true, pendingEmail: email }))
    }
    return { error: error as Error | null }
  }

  const verifyOtp = async (email: string, token: string) => {
    if (!isSupabaseConfigured) {
      setState(s => ({ ...s, demoMode: true, user: { email } as User }))
      return { error: null }
    }
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    return { error: error as Error | null }
  }

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setState(s => ({ ...s, user: null, session: null, emailSent: false, pendingEmail: null, demoMode: !isSupabaseConfigured }))
  }

  const setPendingEmail = (email: string) => {
    setState(s => ({ ...s, pendingEmail: email }))
  }

  const enterDemoMode = () => {
    setState(s => ({ ...s, demoMode: true, user: { email: 'demo@example.com' } as User }))
  }

  return (
    <AuthContext.Provider value={{ ...state, signInWithOtp, verifyOtp, signOut, setPendingEmail, enterDemoMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
