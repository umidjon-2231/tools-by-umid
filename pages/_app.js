
import "../styles/main.scss"
import "../styles/loader.scss"

import "react-toastify/dist/ReactToastify.min.css"
import {toast, ToastContainer} from "react-toastify"


import React, {useState, useEffect} from "react"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"
import {useStore} from "../redux/store";
import {Provider} from "react-redux";






function MyApp({ Component, pageProps }) {
    const [loading, setLoading]=useState(true)
    const store = useStore(pageProps.initialReduxState)

    //
    // useEffect(async ()=>{
    //     // setLoading(false)
    //
    // }, [Component])





    // if(loading){
    //     return <Loader/>
    // }


  return (
      <Provider store={store}>
          {/*<Loader/>*/}
          <Component  {...pageProps} />
          <ToastContainer/>
      </Provider>
      )
}

export default MyApp
