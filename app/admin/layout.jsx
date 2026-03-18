'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '◻' },
    { label: 'Aufträge', href: '/admin/jobs', icon: '▣' },
    { label: 'Kunden', href: '/admin/clients', icon: '◎' },
    { label: 'Mitarbeiter', href: '/admin/workers', icon: '◉' },
    { label: 'Kalender', href: '/admin/calendar', icon: '◫' },
    { label: 'Rechnungen', href: '/admin/invoices', icon: '◧' },
    { label: 'Berichte', href: '/admin/reports', icon: '△' },
    { label: 'Einstellungen', href: '/admin/settings', icon: '⚙' },
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logoWrap}>
            <div style={styles.logoBox}>J</div>
            <div>
              <div style={styles.logoText}>JobFlow</div>
              <div style={styles.logoSub}>Admin Workspace</div>
            </div>
          </div>

          <nav style={styles.nav}>
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    ...styles.navItem,
                    ...(active ? styles.navItemActive : {}),
                  }}
                >
                  <span style={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <div style={styles.proCard}>
            <div style={styles.proBadge}>Premium</div>
            <h3 style={styles.proTitle}>JobFlow Admin</h3>
            <p style={styles.proText}>
              Verwaltung von Aufträgen, Kunden, Team und Rechnungen in einem System.
            </p>
          </div>
        </div>
      </aside>

      <div style={styles.contentArea}>
        <header style={styles.topbar}>
          <div>
            <div style={styles.topbarKicker}>JOBFLOW</div>
            <h1 style={styles.topbarTitle}>Admin Bereich</h1>
          </div>

          <div style={styles.topbarRight}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                type="text"
                placeholder="Suchen..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.userCard}>
              <div style={styles.userAvatar}>A</div>
              <div>
                <div style={styles.userName}>Admin</div>
                <div style={styles.userRole}>Company Admin</div>
              </div>
            </div>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Abmelden
            </button>
          </div>
        </header>

        <main style={styles.main}>{children}</main>
      </div>
    </div>
  )
}

const styles = {
  shell: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    background: 'linear-gradient(180deg, #f8fbff 0%, #eef4fb 45%, #e9f0f8 100%)',
  },

  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '22px 18px',
    background: 'linear-gradient(180deg, #0f2d63 0%, #163b7a 52%, #1d4f9f 100%)',
    color: '#fff',
    boxShadow: '8px 0 30px rgba(15, 23, 42, 0.12)',
  },

  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '28px',
    padding: '8px 8px 14px 8px',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  },

  logoBox: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
    color: '#163b7a',
    fontWeight: '900',
    fontSize: '22px',
    boxShadow: '0 10px 30px rgba(255,255,255,0.12)',
  },

  logoText: {
    fontSize: '20px',
    fontWeight: '900',
    lineHeight: 1,
  },

  logoSub: {
    fontSize: '12px',
    opacity: 0.78,
    marginTop: '4px',
  },

  nav: {
    display: 'grid',
    gap: '10px',
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 14px',
    borderRadius: '16px',
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.86)',
    fontWeight: '700',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.04)',
    transition: '0.2s ease',
  },

  navItemActive: {
    color: '#ffffff',
    background: 'rgba(255,255,255,0.14)',
    border: '1px solid rgba(255,255,255,0.16)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
  },

  navIcon: {
    width: '22px',
    display: 'inline-flex',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: '900',
  },

  sidebarBottom: {
    marginTop: '20px',
  },

  proCard: {
    padding: '18px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
  },

  proBadge: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.18)',
    fontSize: '11px',
    fontWeight: '800',
    marginBottom: '10px',
  },

  proTitle: {
    fontSize: '18px',
    fontWeight: '900',
    marginBottom: '8px',
  },

  proText: {
    fontSize: '13px',
    lineHeight: 1.6,
    opacity: 0.84,
  },

  contentArea: {
    padding: '20px',
  },

  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '18px',
    marginBottom: '20px',
    padding: '18px 22px',
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.76)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
  },

  topbarKicker: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#2563eb',
    marginBottom: '6px',
  },

  topbarTitle: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#163b7a',
    lineHeight: 1.1,
  },

  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },

  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f8fbff',
    border: '1px solid #dde7f2',
    borderRadius: '16px',
    padding: '0 12px',
    minWidth: '240px',
    height: '48px',
  },

  searchIcon: {
    color: '#64748b',
    fontSize: '14px',
  },

  searchInput: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    width: '100%',
    fontSize: '14px',
    color: '#0f172a',
  },

  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#ffffff',
    border: '1px solid #e5edf5',
    borderRadius: '16px',
    padding: '8px 12px',
  },

  userAvatar: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    fontWeight: '900',
  },

  userName: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#0f172a',
  },

  userRole: {
    fontSize: '12px',
    color: '#64748b',
  },

  logoutBtn: {
    border: 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '800',
    cursor: 'pointer',
  },

  main: {
    minHeight: 'calc(100vh - 120px)',
  },
}
