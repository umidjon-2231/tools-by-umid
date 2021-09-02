import {useCallback, useState} from 'react'
import {toast} from "react-toastify"



export const useHttp=()=>{
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(null)
    const request=useCallback(async (url, method='Get', body=null, headers={})=>{
        setLoading(true)
        try {
            if(body){
                body=JSON.stringify(body)
                headers['Content-Type']='application/json'
            }
            const response=await fetch(url, {method, body, headers})
            const data=await response.json()
            if(data.status!==200 && data.status!==201){
                toast.error(data.message)
            }
            if(!response.ok){
                throw new Error(data.message || '')
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