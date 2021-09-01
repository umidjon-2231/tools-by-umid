import {toast} from "react-toastify"
import {useRouter} from "next/router"
const jwt=require('jsonwebtoken')
import {useState} from 'react'
import {useAuth} from "./auth.hook"



export const useCheckToken= ()=>{
    const {token, logout}=useAuth()
    const router=useRouter()
    try{
        const info= jwt.verify(token, "Umidjon2231");
        return info
    }catch (e) {
        try {
            if(router.pathname!=='/'){
                logout()
                toast.error("Your token expired, please repeat password 1")
            }

        }catch (e) {
            console.log(e.message)
        }
    }

}