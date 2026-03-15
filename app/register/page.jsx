'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [fullName,setFullName] = useState('')
  const [loading,setLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const [success,setSuccess] = useState(false)

  const handleRegister = async (e) => {

    e.preventDefault()

    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signUp({

      email,
      password,

      options:{
        data:{
          full_name: fullName
        }
      }

    })

    if(error){
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    setTimeout(()=>{
      router.push('/login')
    },2000)

  }

  return (

    <main style={styles.page}>

      <div style={styles.card}>

        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

        <h1 style={styles.title}>
          Neue Kundenregistrierung
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Vor- und Nachname"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            style={styles.input}
            required
          />

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

          {errorMessage && (
            <p style={styles.error}>
              {errorMessage}
            </p>
          )}

          {success && (
            <p style={styles.success}>
              Registrierung erfolgreich. Weiter zum Login...
            </p>
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Registrierung...' : 'Registrieren'}
          </button>

        </form>

        <Link href="/login" style={styles.link}>
          Zurück zum Login
        </Link>

      </div>

    </main>

  )
}

const styles = {

  page:{
    minHeight:'100vh',
    background:'#eef2f7',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:'24px'
  },

  card:{
    width:'100%',
    maxWidth:'420px',
    background:'#fff',
    padding:'32px',
    borderRadius:'24px',
    boxShadow:'0 10px 30px rgba(0,0,0,0.08)',
    textAlign:'center'
  },

  logo:{
    width:'140px',
    marginBottom:'16px'
  },

  title:{
    fontSize:'22px',
    fontWeight:'700',
    marginBottom:'20px',
    color:'#163b7a'
  },

  input:{
    width:'100%',
    padding:'14px',
    borderRadius:'10px',
    border:'1px solid #d0d5dd',
    marginBottom:'14px'
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
    color:'red',
    marginBottom:'10px'
  },

  success:{
    color:'green',
    marginBottom:'10px'
  },

  link:{
    display:'block',
    marginTop:'16px',
    color:'#163b7a'
  }

}
