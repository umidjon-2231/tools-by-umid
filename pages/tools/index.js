import React, {useState} from 'react';
import Homepage from "../../components/Homepage"
import {useAuth} from "../../hooks/auth.hook"
import {useEffect} from 'react'
import Custom404 from "../404"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import Loader from "../../components/Loader"



const Index = () => {
    const [loading, setLoading]=useState(true)
    const {token}=useAuth()
    const router=useRouter()

    useEffect(()=>{

    },[])

    useEffect(()=>{setLoading(true);setLoading(false)}, [(router.query.name)])

    if(loading){
        return <Loader/>
    }



    if(token!==null){
        return (
            <Homepage/>
        );
    }
    return <Custom404/>



};

export default Index;