import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss"
import "../styles/theme.scss"
import "../styles/loader.scss"
import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify"
import mongoose from "mongoose"



import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";
import React, {useState, useEffect} from "react"
import {AuthContext} from "../context/AuthContext"
import {useAuth} from "../hooks/auth.hook"
import connectDB from "../middleware/mongodb"


const override = css`
  display: block;
  margin: 0 auto;
`;





function MyApp({ Component, pageProps }) {
    const [loading, setLoading]=useState(true);
    const {token, login, userId, logout, ready}=useAuth()
    const jwt=require('jsonwebtoken')


    useEffect(()=>{
        setLoading(false)

        setInterval(()=>{
            if(!!token){
                console.log("Check")
                try {
                    const verify=jwt.verify(token, 'Umidjon2231')
                }catch (e) {
                    logout()
                }
            }
        }, 5000)

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
