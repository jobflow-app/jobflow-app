"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function Login(){

const router=useRouter()
const [email,setEmail]=useState("")
const [pass,setPass]=useState("")

function login(){

if(email==="admin@jobflow.com" && pass==="admin123"){
localStorage.setItem("role","superadmin")
router.push("/superadmin")
return
}

if(pass==="firma123"){
localStorage.setItem("role","firma")
router.push("/dashboard")
return
}

alert("Login failed")

}

return(
<div className="container">
<div className="card">
<h2>JobFlow Login</h2>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
<input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/>
<button onClick={login}>Login</button>

<p style={{marginTop:20,fontSize:12}}>
Superadmin:<br/>
admin@jobflow.com / admin123
</p>

<p style={{fontSize:12}}>
Firma test:<br/>
any email / firma123
</p>

</div>
</div>
)

}
