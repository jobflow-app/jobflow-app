'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../lib/supabase'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function WorkersMap({ companyId }) {
  const [workers, setWorkers] = useState([])

  const defaultCenter = [47.8095, 13.0550]

  useEffect(() => {

    async function loadWorkers() {
      if (!supabase) return

      const { data } = await supabase
        .from('worker_gps_status')
        .select('*')
        .eq('company_id', companyId)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      setWorkers(data || [])
    }

    loadWorkers()

    const interval = setInterval(loadWorkers, 5000)

    return () => clearInterval(interval)

  }, [companyId])

  return (
    <div style={{ width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: '600px', borderRadius: '16px' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {workers.map((worker) => (
          <Marker
            key={worker.id}
            position={[worker.latitude, worker.longitude]}
          >
            <Popup>
              <strong>{worker.worker_email}</strong>
              <br />
              Status: {worker.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
