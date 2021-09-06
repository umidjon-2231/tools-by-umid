
import "../styles/main.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {toast, ToastContainer} from "react-toastify"


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"






function MyApp({ Component, pageProps }) {
    const jwt=require('jsonwebtoken')
    const {logout}=useAuth()
    const [loading, setLoading]=useState(true)
    const router=useRouter()


    useEffect(async ()=>{
        setLoading(false)
        {/*    todo: security update*/}

    }, [Component])





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
