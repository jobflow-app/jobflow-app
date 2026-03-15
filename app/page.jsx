'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Session error:', error.message)
          router.replace('/login')
          return
        }

        if (data?.session?.user) {
          router.replace('/dashboard')
        } else {
          router.replace('/login')
        }
      } catch (err) {
        console.error('Unexpected session error:', err)
        router.replace('/login')
      }
    }

    checkSession()
  }, [router])

  return (
    <main style={styles.page}>
      <p style={styles.text}>Loading...</p>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
  },
  text: {
    fontSize: '18px',
    color: '#374151',
  },
}
