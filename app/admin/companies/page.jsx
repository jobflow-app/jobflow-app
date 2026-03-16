'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SuperadminCompaniesPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState('')
  const [deletingId, setDeletingId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    checkAccessAndLoad()
  }, [])

  async function checkAccessAndLoad() {
    try {
      setLoading(true)
      setErrorMessage('')

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/login')
        return
      }

      const email = user.email || ''
      setUserEmail(email)

      const { data: superadminRow, error: superadminError } = await supabase
        .from('superadmins')
        .select('email')
        .eq('email', email)
        .maybeSingle()

      if (superadminError || !superadminRow) {
        router.push('/dashboard')
        return
      }

      await loadCompanies()
    } catch (error) {
      console.error(error)
      setErrorMessage('Fehler beim Laden der Seite.')
    } finally {
      setLoading(false)
    }
  }

  async function loadCompanies() {
    try {
      setErrorMessage('')
      setSuccessMessage('')

      const { data, error } = await supabase
        .from('companies')
        .select('id, company_name, owner_email, phone, address, plan, trial_start, trial_end, status')
        .order('company_name', { ascending: true })

      if (error) throw error

      setCompanies(data || [])
    } catch (error) {
      console.error(error)
      setErrorMessage('Firmen konnten nicht geladen werden.')
    }
  }

  async function updateCompanyStatus(companyId, newStatus) {
    try {
      setSavingId(companyId)
      setErrorMessage('')
      setSuccessMessage('')

      const { error } = await supabase
        .from('companies')
        .update({ status: newStatus })
        .eq('id', companyId)

      if (error) throw error

      setCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId ? { ...company, status: newStatus } : company
        )
      )

      setSuccessMessage(`Firmenstatus wurde auf "${newStatus}" gesetzt.`)
    } catch (error) {
      console.error(error)
      setErrorMessage('Status konnte nicht aktualisiert werden.')
    } finally {
      setSavingId('')
    }
  }

  async function deleteCompany(companyId, companyName) {
    const confirmed = window.confirm(
      `Möchtest du die Firma "${companyName}" wirklich löschen?`
    )

    if (!confirmed) return

    try {
      setDeletingId(companyId)
      setErrorMessage('')
      setSuccessMessage('')

      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId)

      if (error) throw error

      setCompanies((prev) => prev.filter((company) => company.id !== companyId))
      setSuccessMessage(`Die Firma "${companyName}" wurde gelöscht.`)
    } catch (error) {
      console.error(error)
      setErrorMessage('Firma konnte nicht gelöscht werden.')
    } finally {
      setDeletingId('')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  function formatDate(value) {
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value

    return new Intl.DateTimeFormat('de-DE').format(date)
  }

  function getStatusLabel(status) {
    const normalized = String(status || '').toLowerCase()

    if (normalized === 'trial') return 'Trial'
    if (normalized === 'active') return 'Aktiv'
    if (normalized === 'inactive') return 'Inaktiv'
    return 'Unbekannt'
  }

  function getStatusStyle(status) {
    const normalized = String(status || '').toLowerCase()

    if (normalized === 'trial') return styles.badgeTrial
    if (normalized === 'active') return styles.badgeActive
    if (normalized === 'inactive') return styles.badgeInactive
    return styles.badgeUnknown
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.loadingCard}>
          <h1 style={styles.loadingTitle}>Firmenverwaltung</h1>
          <p style={styles.loadingText}>Daten werden geladen ...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.kicker}>JOBFLOW SAAS</p>
          <h1 style={styles.title}>Firmenverwaltung</h1>
          <p style={styles.subtitle}>
            Hier verwaltest du alle Firmen, ihren Status und weitere Basisdaten.
          </p>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.userBox}>
            <span style={styles.userLabel}>Angemeldet als</span>
            <span style={styles.userValue}>{userEmail}</span>
          </div>

          <button onClick={handleLogout} style={styles.logoutButton}>
            Abmelden
          </button>
        </div>
      </section>

      <section style={styles.topActions}>
        <Link href="/superadmin/dashboard" style={styles.secondaryButton}>
          Zum Dashboard
        </Link>

        <button onClick={loadCompanies} style={styles.refreshButton}>
          Aktualisieren
        </button>
      </section>

      {errorMessage ? <div style={styles.errorBox}>{errorMessage}</div> : null}
      {successMessage ? <div style={styles.successBox}>{successMessage}</div> : null}

      <section style={styles.section}>
        <div style={styles.tableWrap}>
          <div style={styles.table}>
            <div style={{ ...styles.row, ...styles.headRow }}>
              <div style={styles.th}>Firma</div>
              <div style={styles.th}>Inhaber</div>
              <div style={styles.th}>Plan</div>
              <div style={styles.th}>Trial Start</div>
              <div style={styles.th}>Trial Ende</div>
              <div style={styles.th}>Status</div>
              <div style={styles.th}>Aktionen</div>
            </div>

            {companies.length === 0 ? (
              <div style={styles.emptyState}>Keine Firmen gefunden.</div>
            ) : (
              companies.map((company) => {
                const isSaving = savingId === company.id
                const isDeleting = deletingId === company.id

                return (
                  <div key={company.id} style={styles.row}>
                    <div style={styles.td}>
                      <div style={styles.companyName}>
                        {company.company_name || 'Unbenannte Firma'}
                      </div>
                      <div style={styles.companyMeta}>
                        ID: {company.id}
                      </div>
                    </div>

                    <div style={styles.td}>
                      <div>{company.owner_email || 'Keine E-Mail'}</div>
                      <div style={styles.subMeta}>{company.phone || '—'}</div>
                    </div>

                    <div style={styles.td}>{company.plan || '—'}</div>
                    <div style={styles.td}>{formatDate(company.trial_start)}</div>
                    <div style={styles.td}>{formatDate(company.trial_end)}</div>

                    <div style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          ...getStatusStyle(company.status),
                        }}
                      >
                        {getStatusLabel(company.status)}
                      </span>
                    </div>

                    <div style={styles.td}>
                      <div style={styles.actionGroup}>
                        <button
                          style={styles.activeButton}
                          onClick={() => updateCompanyStatus(company.id, 'active')}
                          disabled={isSaving || isDeleting}
                        >
                          Aktivieren
                        </button>

                        <button
                          style={styles.trialButton}
                          onClick={() => updateCompanyStatus(company.id, 'trial')}
                          disabled={isSaving || isDeleting}
                        >
                          Trial
                        </button>

                        <button
                          style={styles.inactiveButton}
                          onClick={() => updateCompanyStatus(company.id, 'inactive')}
                          disabled={isSaving || isDeleting}
                        >
                          Deaktivieren
                        </button>

                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            deleteCompany(company.id, company.company_name || 'Firma')
                          }
                          disabled={isSaving || isDeleting}
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef4fb',
    padding: '24px',
  },
  loadingCard: {
    maxWidth: '600px',
    margin: '120px auto',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
    textAlign: 'center',
  },
  loadingTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '10px',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  kicker: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#2563eb',
    marginBottom: '8px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    maxWidth: '760px',
    lineHeight: 1.6,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  userBox: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '14px 16px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
    minWidth: '240px',
  },
  userLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
  },
  userValue: {
    display: 'block',
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: '700',
    wordBreak: 'break-word',
  },
  logoutButton: {
    border: 'none',
    borderRadius: '14px',
    padding: '14px 18px',
    background: '#163b7a',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  topActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  secondaryButton: {
    textDecoration: 'none',
    background: '#ffffff',
    color: '#163b7a',
    borderRadius: '14px',
    padding: '12px 16px',
    fontWeight: '800',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
  },
  refreshButton: {
    border: 'none',
    background: '#2563eb',
    color: '#ffffff',
    borderRadius: '14px',
    padding: '12px 16px',
    fontWeight: '800',
    cursor: 'pointer',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '16px',
    padding: '14px 16px',
    marginBottom: '18px',
  },
  successBox: {
    background: '#dcfce7',
    color: '#166534',
    borderRadius: '16px',
    padding: '14px 16px',
    marginBottom: '18px',
  },
  section: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '20px',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '1280px',
  },
  headRow: {
    background: '#f8fbff',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1.3fr 0.7fr 0.8fr 0.8fr 0.8fr 1.7fr',
    gap: '12px',
    alignItems: 'center',
    padding: '16px 14px',
    borderBottom: '1px solid #e5e7eb',
  },
  th: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '800',
    color: '#2563eb',
  },
  td: {
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: '600',
  },
  companyName: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '4px',
  },
  companyMeta: {
    fontSize: '12px',
    color: '#64748b',
    wordBreak: 'break-word',
  },
  subMeta: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '4px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '92px',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '800',
  },
  badgeTrial: {
    background: '#fef3c7',
    color: '#92400e',
  },
  badgeActive: {
    background: '#dcfce7',
    color: '#166534',
  },
  badgeInactive: {
    background: '#fee2e2',
    color: '#b91c1c',
  },
  badgeUnknown: {
    background: '#e2e8f0',
    color: '#334155',
  },
  actionGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  activeButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '10px 12px',
    background: '#16a34a',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  trialButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '10px 12px',
    background: '#d97706',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  inactiveButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '10px 12px',
    background: '#475569',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  deleteButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '10px 12px',
    background: '#dc2626',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  emptyState: {
    padding: '24px 14px',
    color: '#64748b',
  },
}
