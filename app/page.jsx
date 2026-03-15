'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const login = async (e) => {

    e.preventDefault()
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
      return
    }

    const user = data.user

    const { data:profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if(!profile){
      setError('Profile not found')
      return
    }

    if(profile.role === 'superadmin'){
      router.push('/superadmin')
      return
    }

    if(profile.role === 'admin'){
      router.push('/dashboard')
      return
    }

    if(profile.role === 'worker'){
      router.push('/worker')
      return
    }

    router.push('/dashboard')
  }

  return (

    <main style={styles.page}>

      <div style={styles.card}>

        <img src="/logo.png" style={styles.logo}/>

        <h1 style={styles.title}>JobFlow</h1>

        <form onSubmit={login} style={styles.form}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button}>
            Login
          </button>

        </form>

        {error && <p style={styles.error}>{error}</p>}

      </div>

    </main>

  )

}

const styles = {

page:{
minHeight:'100vh',
display:'flex',
justifyContent:'center',
alignItems:'center',
background:'#eef2f7'
},

card:{
width:'420px',
background:'#fff',
padding:'40px',
borderRadius:'20px',
boxShadow:'0 10px 30px rgba(0,0,0,0.08)'
},

logo:{
width:'120px',
display:'block',
margin:'0 auto 20px'
},

title:{
textAlign:'center',
fontSize:'30px',
fontWeight:'800',
color:'#163b7a',
marginBottom:'20px'
},

form:{
display:'flex',
flexDirection:'column',
gap:'12px'
},

input:{
padding:'14px',
borderRadius:'12px',
border:'1px solid #ddd'
},

button:{
background:'#163b7a',
color:'#fff',
border:'none',
padding:'14px',
borderRadius:'12px',
fontWeight:'700',
cursor:'pointer'
},

error:{
color:'red',
marginTop:'10px',
textAlign:'center'
}

}
