'use client'

export default function LanguageSwitcher({ language, onChange, labels }) {
  return (
    <div style={styles.row}>
      <button
        type="button"
        onClick={() => onChange('de')}
        style={{
          ...styles.button,
          ...(language === 'de' ? styles.active : {}),
        }}
      >
        {labels.languageDe}
      </button>

      <button
        type="button"
        onClick={() => onChange('en')}
        style={{
          ...styles.button,
          ...(language === 'en' ? styles.active : {}),
        }}
      >
        {labels.languageEn}
      </button>

      <button
        type="button"
        onClick={() => onChange('bhs')}
        style={{
          ...styles.button,
          ...(language === 'bhs' ? styles.active : {}),
        }}
      >
        {labels.languageBhs}
      </button>
    </div>
  )
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  button: {
    border: '1px solid #d7deea',
    background: '#f9fbfe',
    color: '#163b7a',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  active: {
    background: '#163b7a',
    color: '#fff',
    border: '1px solid #163b7a',
  },
}
