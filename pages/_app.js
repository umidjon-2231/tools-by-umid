
import "../styles/main.scss"
// import "../styles/theme.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify"
import {ScaleLoader} from 'react-spinners'


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import axios from "axios"






function MyApp({ Component, pageProps }) {
    const {token, login, userId, logout, ready}=useAuth()
    const jwt=require('jsonwebtoken')
    const [loading, setLoading]=useState(true)


    useEffect(()=>{
        window.addEventListener('offline', ()=>{setLoading(true)})
        window.addEventListener('online', ()=>{setLoading(false)})
        setLoading(false)

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
