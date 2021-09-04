
import "../styles/main.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {toast, ToastContainer} from "react-toastify"


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"






function MyApp({ Component, pageProps }) {
    const {token, logout, login}=useAuth()
    const jwt=require('jsonwebtoken')
    const [loading, setLoading]=useState(true)
    const router=useRouter()


    useEffect(()=>{
        setLoading(false)
        {/*    todo: security update*/}


        // setInterval(()=>{
        //     if(token!==null && router.pathname!=='/guest-tools/[name]' && router.pathname!=='/guest-tools' && router.pathname!=='/'){
        //         try {
        //             jwt.verify(token, 'Umidjon2231')
        //         }catch (e) {
        //             toast.error('Your token expired please repeat password 1')
        //             logout()
        //
        //         }
        //     }
        // }, 1000)
    }, [])


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
