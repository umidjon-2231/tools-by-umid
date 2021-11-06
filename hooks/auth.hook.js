import {useState, useCallback, useEffect} from 'react'
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import {deleteCookie, getCookies, setCookie} from "../toolsOfProject";
const jwt=require('jsonwebtoken')

const storageName=process.env.storageName


export const useAuth=()=>{
    const [token, setToken]=useState(null)
    const [ready, setReady]=useState(false)

    const router=useRouter()

    const login=useCallback((jwtToken)=>{
        setToken(jwtToken)
        setCookie('token', jwtToken, 2)
    }, [])

    const logout=useCallback(()=>{
        setToken(null)
        sessionStorage.removeItem('secret')
        deleteCookie('token')
        router.push('/')


    }, [])

    const takeToken=useCallback(()=>{
        const data=getCookies('token', document.cookie)
        if(data){
            setToken(data)
            return data
        }

    },[])

    useEffect(async ()=>{
        const data=await getCookies('token', document.cookie)

        if(data){
            setToken(data)
            login(data)
            try {
                await jwt.verify(data, 'Umidjon2231')
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