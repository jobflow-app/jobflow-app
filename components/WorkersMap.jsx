'use client'

export default function WorkersMap() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workers Map</h2>
      <p style={styles.text}>Mapa će biti ovdje.</p>
    </div>
  )
}

const styles = {
  container: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '10px',
  },
  text: {
    color: '#6b7280',
  },
}
