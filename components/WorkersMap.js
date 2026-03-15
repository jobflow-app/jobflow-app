'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function WorkersMap({ title = 'Workers Map' }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    mapInstance.current = L.map(mapRef.current).setView([47.7994, 12.8721], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.current)

    L.marker([47.7994, 12.8721])
      .addTo(mapInstance.current)
      .bindPopup('Worker location')
      .openPopup()
  }, [])

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.subtitle}>Live GPS mapa radnika</p>
      </div>

      <div ref={mapRef} style={styles.mapBox}></div>
    </div>
  )
}

const styles = {
  wrapper: {
    width: '100%',
  },
  header: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '6px',
  },
  subtitle: {
    color: '#6b7280',
  },
  mapBox: {
    width: '100%',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
  },
}
