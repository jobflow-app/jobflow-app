"use client"

import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { getCurrentPosition } from "../../../lib/gps"

export default function WorkerJobPage() {
  const [status, setStatus] = useState("planned")
  const [message, setMessage] = useState("")

  async function saveStatus(nextStatus) {
    try {
      setMessage("Saving...")

      const coords = await getCurrentPosition()

      const { error } = await supabase.from("worker_gps_status").insert({
        worker_email: "info@vs-technik.de",
        job_id: "demo-job-1",
        status: nextStatus,
        lat: coords.lat,
        lng: coords.lng,
      })

      if (error) {
        setMessage("Error saving GPS status")
        return
      }

      setStatus(nextStatus)
      setMessage(`Status saved: ${nextStatus}`)
    } catch (error) {
      setMessage("Location error or permission denied")
    }
  }

  function openNavigation() {
    const address = encodeURIComponent("Salzburg 12")
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank")
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Worker Job</h1>
      <p style={styles.subtitle}>Customer: Müller</p>
      <p style={styles.subtitle}>Address: Salzburg 12</p>
      <p style={styles.status}>Current status: {status}</p>

      <div style={styles.actions}>
        <button style={styles.btn} onClick={openNavigation}>
          Navigate
        </button>

        <button style={styles.btn} onClick={() => saveStatus("arrived")}>
          Arrived
        </button>

        <button style={styles.btn} onClick={() => saveStatus("started")}>
          Start Job
        </button>

        <button style={styles.btn} onClick={() => saveStatus("completed")}>
          Finish Job
        </button>
      </div>

      {message ? <p style={styles.message}>{message}</p> : null}
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px",
    background: "#eef2f7",
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#163b7a",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#4b5563",
    marginBottom: "6px",
  },
  status: {
    marginTop: "18px",
    marginBottom: "18px",
    fontWeight: "700",
    color: "#1f2937",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "320px",
  },
  btn: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#163b7a",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    color: "#1f2937",
    fontWeight: "600",
  },
}
