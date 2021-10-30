import {useState, useCallback, useEffect} from 'react'
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import {deleteCookie, setCookie} from "../toolsOfProject";
const jwt=require('jsonwebtoken')

const storageName=process.env.storageName


export const useAuth=()=>{
    const [token, setToken]=useState(null)
    const [ready, setReady]=useState(false)

    const router=useRouter()

    const login=useCallback((jwtToken)=>{
        setToken(jwtToken)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken}))
        setCookie('token', jwtToken, 2)
    }, [])

    const logout=useCallback(()=>{
        setToken(null)
        localStorage.removeItem(storageName)
        sessionStorage.removeItem('secret')
        deleteCookie('token')
        router.push('/')


    }, [])

    const takeToken=useCallback(()=>{
        const data=JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            setToken(data.token)
            return data.token
        }

    },[])

    useEffect(async ()=>{
        const data=await JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            setToken(data.token)
            login(data.token)
            try {
                await jwt.verify(data.token, 'Umidjon2231')
            }catch (e) {
                if(router.pathname!=='/' &&
                    e.name==='TokenExpiredError' &&
                    router.pathname!=='/guest-tools/[name]' && router.pathname!=='/guest-tools'){
                    // toast.error("Your token expired, please repeat password")
                    await logout()
                }
            }
        }
        setReady(true)

    }, [login])


    return {login, logout, token, ready, takeToken}
}