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


const override = css`
  display: block;
  margin: 0 auto;
`;





function MyApp({ Component, pageProps }) {
    const [loading, setLoading]=useState(true);
    const {token, login, userId, logout, ready}=useAuth()

    const isAuthenticated=!!token
    useEffect(()=>{
        // startMongo()
        setLoading(false)
    }, [Component])

    const startMongo= async ()=>{
        try {
            await mongoose.connect(process.env.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
        }catch (e) {
            console.log(e.message)
        }


    }



  return (
      <>
          {loading? <div className="loader">
              <ScaleLoader color={"#343A40"} css={override} loading={true} size={"2000px"}/>
          </div>:""}
          {/*<AuthContext.Provider value={{*/}
          {/*    token, login, logout, userId, isAuthenticated*/}
          {/*}}>*/}


          <Component  ponent {...pageProps} />
          {/*</AuthContext.Provider>*/}
          <ToastContainer/>

      </>
      )
}

export default MyApp
