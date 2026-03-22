'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentProfile } from '@/lib/auth'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      const { user, profile } = await getCurrentProfile()

      if (!user) {
        router.replace('/login')
        return
      }

      if (!profile || profile.role !== 'admin') {
        router.replace('/login')
        return
      }

      setAllowed(true)
    }

    checkAccess()
  }, [router])

  if (!allowed) {
    return <div style={styles.loading}>Wird geladen...</div>
  }

  return children
}

const styles = {
  loading: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#475569',
    background: '#f8fbff',
  },
}
