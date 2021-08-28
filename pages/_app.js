
import "../styles/main.scss"
// import "../styles/theme.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify"


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"






function MyApp({ Component, pageProps }) {
    const [loading, setLoading]=useState(true);
    const {token, login, userId, logout, ready}=useAuth()
    const jwt=require('jsonwebtoken')


    useEffect(()=>{
        setLoading(false)


    }, [])




  return (
      <>
          {/*{loading? <div className="loader">*/}
          {/*    <ScaleLoader color={"#343A40"} css={override} loading={true} size={"2000px"}/>*/}
          {/*</div>:""}*/}


          <Component  ponent {...pageProps} />
          <ToastContainer/>

      </>
      )
}

export default MyApp
