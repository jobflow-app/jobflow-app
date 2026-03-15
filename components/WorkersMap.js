'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { supabase } from '../lib/supabase'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function WorkersMap() {
  const [workers, setWorkers] = useState([])

  useEffect(() => {
    loadWorkers()
  }, [])

  async function loadWorkers() {
    const { data, error } = await supabase
      .from('worker_gps_status')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)

    if (error) {
      console.error('Greška kod učitavanja GPS podataka:', error.message)
      return
    }

    setWorkers(data || [])
  }

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer
        center={[47.8095, 13.055]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {workers.map((worker) => (
          <Marker
            key={worker.worker_email}
            position={[worker.latitude, worker.longitude]}
          >
            <Popup>
              <div>
                <strong>{worker.worker_email}</strong>
                <br />
                Status: {worker.status}
                <br />
                Lat: {worker.latitude}
                <br />
                Lng: {worker.longitude}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
