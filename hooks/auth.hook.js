import {useState, useCallback, useEffect} from 'react'
import {useRouter} from "next/router"
import {useCheckToken} from "./checkToken"
import {toast} from "react-toastify"
const jwt=require('jsonwebtoken')

const storageName=process.env.storageName


export const useAuth=()=>{
    const [token, setToken]=useState(null)
    const [password, setPassword]=useState('')
    const [ready, setReady]=useState(false)

    const router=useRouter()

    const login=useCallback((jwtToken, password)=>{
        setToken(jwtToken)
        setPassword(password)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken}))

    }, [])

    const logout=useCallback(()=>{
        setToken(null)
        localStorage.removeItem(storageName)
        router.push('/')
    }, [])
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            try {
                const verify=jwt.verify(data.token, 'Umidjon2231')
                login(data.token, verify.password)
            }catch (e) {
                if(router.pathname!=='/'){
                    toast.error("Your token expired, please repeat password")
                    router.push('/')
                }
            }

        }
        setReady(true)

    }, [login])


    return {login, logout, token, ready, password}
}