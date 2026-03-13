"use client"

export default function MapPage() {
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Map</h1>
      <p style={styles.text}>
        GPS worker tracking and job map will appear here.
      </p>

      <div style={styles.box}>
        <p><strong>Marko</strong> — On the way</p>
        <p>Job: Müller</p>
        <p>Location: 47.724, 12.877</p>
      </div>

      <div style={styles.box}>
        <p><strong>Ivan</strong> — Started</p>
        <p>Job: Schmidt</p>
        <p>Location: 47.730, 12.880</p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    background: "#eef2f7",
  },
  title: {
    color: "#163b7a",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "12px",
  },
  text: {
    color: "#4b5563",
    marginBottom: "24px",
  },
  box: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
}
