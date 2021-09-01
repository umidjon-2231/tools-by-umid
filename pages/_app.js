
import "../styles/main.scss"
// import "../styles/theme.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify"


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"






function MyApp({ Component, pageProps }) {
    const {token, login, userId, logout, ready}=useAuth()
    const jwt=require('jsonwebtoken')
    const [loading, setLoading]=useState(true)
    const router=useRouter()


    useEffect(()=>{
        window.addEventListener('offline', ()=>{setLoading(true)})
        window.addEventListener('online', ()=>{setLoading(false)})
        setLoading(false)
    }, [])
    setInterval(()=>{
        if(token!==null && router.pathname!=='/guest-tools/[name]' && router.pathname!=='/'){
            try {
                jwt.verify(token, 'Umidjon2231')
            }catch (e) {
                logout()
            }
        }
    }, 900000)

    if(loading){
        return <Loader/>
    }


  return (
      <>
          <Component  {...pageProps} />
          <ToastContainer/>
      </>
      )
}

export default MyApp
