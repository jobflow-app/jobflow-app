"use client"

import { setLanguage } from "../lib/i18n"

export default function LanguageSwitcher(){

  function changeLang(lang){
    setLanguage(lang)
    location.reload()
  }

  return(

    <div style={{display:"flex",gap:"10px"}}>

      <button onClick={()=>changeLang("de")}>DE</button>

      <button onClick={()=>changeLang("en")}>EN</button>

      <button onClick={()=>changeLang("bhs")}>BHS</button>

    </div>

  )

}
