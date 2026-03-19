'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDark(true)
    }
  }

  return (
    <button onClick={toggle} style={styles.button}>
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

const styles = {
  button: {
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    background: 'var(--card)',
    cursor: 'pointer',
    fontWeight: '700',
  },
}
