
import "../styles/main.scss"
// import "../styles/theme.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify"
import {ScaleLoader} from 'react-spinners'


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"






function MyApp({ Component, pageProps }) {
    const {token, login, userId, logout, ready}=useAuth()
    const jwt=require('jsonwebtoken')


    useEffect(()=>{

    }, [Component])




  return (
      <>


          <Component  {...pageProps} />
          <ToastContainer/>

      </>
      )
}

export default MyApp
