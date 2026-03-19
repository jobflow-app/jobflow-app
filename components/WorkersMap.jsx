'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// FIX za marker icon (Next.js bug)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

export default function WorkersMap() {
  // 🔥 DEMO workers (poslije ide Supabase)
  const workers = [
    {
      id: 1,
      name: 'Velibor',
      lat: 47.8095,
      lng: 12.9866,
    },
    {
      id: 2,
      name: 'Marko',
      lat: 47.8050,
      lng: 12.9800,
    },
  ]

  return (
    <div style={styles.container}>
      <MapContainer
        center={[47.8095, 12.9866]}
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {workers.map((worker) => (
          <Marker key={worker.id} position={[worker.lat, worker.lng]}>
            <Popup>
              <b>{worker.name}</b>
              <br />
              Worker location
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

const styles = {
  container: {
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  map: {
    height: '500px',
    width: '100%',
  },
}
