'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function HomePage() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  async function handleLogin(e){

    e.preventDefault()

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if(error){
      setError(error.message)
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if(!userEmail){
      setError('Login failed')
      setLoading(false)
      return
    }

    if(userEmail === 'info@vs-technik.de'){
      router.push('/admin')
      return
    }

    if(userEmail.includes('worker')){
      router.push('/worker')
      return
    }

    router.push('/dashboard')

  }

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

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button style={styles.button}>
            {loading ? "Loading..." : "Anmelden"}
          </button>

        </form>

        {error && <p style={styles.error}>{error}</p>}

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
width:'420px',
background:'#fff',
borderRadius:'24px',
padding:'40px',
textAlign:'center',
boxShadow:'0 10px 30px rgba(0,0,0,0.08)'
},

logo:{
width:'320px',
marginBottom:'35px'
},

subtitle:{
color:'#6b7280',
marginBottom:'24px'
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
border:'none',
background:'#163b7a',
color:'#fff',
fontWeight:'700',
cursor:'pointer'
},

error:{
marginTop:'10px',
color:'red'
},

languages:{
marginTop:'14px',
fontSize:'14px',
color:'#6b7280'
}

}
