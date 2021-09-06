import React, {useCallback, useState} from 'react'
import {toast} from "react-toastify"
import {useAuth} from "./auth.hook"




export const useHttp=()=>{
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(null)
    const {logout}=useAuth()
    const toastId = React.useRef(null);

    const request=useCallback(async (url, method='Get', body=null, headers={})=>{
        setLoading(true)
        try {
            if(body){
                body=JSON.stringify(body)
                headers['Content-Type']='application/json'
            }
            const response=await fetch(url, {method, body, headers})
            const data=await response.json()
            if(data.status===401){
                if(!toast.isActive(toastId.current)) {
                    toastId.current = toast.error("Invalid token or token expired");
                }
                await logout()
                await setLoading(false)
                return {status: 401}
            }
            if(data.status!==200 && data.status!==201){
                if(!toast.isActive(toastId.current)) {
                    toastId.current = toast.error(data.message);
                }
            }

            if(!response){
                throw new Error(data.message || 'Error')
            }
            setLoading(false)

            return data

        }catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError=useCallback(()=>setError(null), [])

    return {loading, request, error, clearError}
}