'use client'

import { useState } from 'react'

export default function HomePage() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  return (

    <main style={styles.page}>

      <div style={styles.card}>

        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

        <p style={styles.subtitle}>
          Handwerk-Managementsystem
        </p>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>
          Anmelden
        </button>

        <p style={styles.languages}>
          Deutsch | English | BHS
        </p>

      </div>

    </main>
  )
}

const styles = {

page:{
minHeight:'100vh',
display:'flex',
alignItems:'center',
justifyContent:'center',
background:'#eef2f7'
},

card:{
width:'380px',
background:'#fff',
borderRadius:'24px',
padding:'40px',
textAlign:'center',
boxShadow:'0 10px 30px rgba(0,0,0,0.08)'
},

logo:{
width:'180px',
marginBottom:'10px'
},

subtitle:{
marginBottom:'24px',
color:'#6b7280'
},

input:{
width:'100%',
padding:'14px',
marginBottom:'12px',
borderRadius:'12px',
border:'1px solid #d1d5db'
},

button:{
width:'100%',
padding:'14px',
borderRadius:'12px',
background:'#163b7a',
color:'#fff',
fontWeight:'700',
border:'none'
},

languages:{
marginTop:'14px',
fontSize:'14px',
color:'#6b7280'
}

}
