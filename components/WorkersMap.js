'use client'

export default function WorkersMap({ title = 'Workers Map' }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '420px',
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '800',
          color: '#163b7a',
          marginBottom: '12px',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          minHeight: '300px',
          borderRadius: '16px',
          border: '2px dashed #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontWeight: '600',
          background: '#f8fafc',
        }}
      >
        Live Workers Map će biti prikazana ovdje.
      </div>
    </div>
  )
}
