import React from 'react';
import Homepage from "../../components/Homepage"
import {useAuth} from "../../hooks/auth.hook"
import {useCheckToken} from "../../hooks/checkToken"
import {useEffect} from 'react'
import Custom404 from "../404"
import {useRouter} from "next/router"
import {toast} from "react-toastify"



const Index = () => {
    const {token}=useAuth()
    const router=useRouter()

    useEffect(()=>{

    },[])


    if(token!==null){
        return (
            <Homepage/>
        );
    }
    return <Custom404/>



};

export default Index;