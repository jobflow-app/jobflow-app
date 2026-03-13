"use client"

import LanguageSwitcher from "./LanguageSwitcher"

export default function Topbar(){

  return(

    <div style={styles.topbar}>

      <h3>JobFlow</h3>

      <LanguageSwitcher/>

    </div>

  )

}

const styles = {

topbar:{
height:"60px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 20px",
background:"#ffffff",
borderBottom:"1px solid #eee"
}

}
