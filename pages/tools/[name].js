import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import {useRouter} from "next/router"
import Decoder from "../../components/tools/Decoder"
import LinkSave from "../../components/tools/LinkSave"
import Custom404 from "../404"
import Secrets from "../../components/tools/Secrets"
import InfoDevice from "../../components/tools/InfoDevice"
import Settings from "../../components/Settings"
import Loader from "../../components/Loader"

const Name = () => {
    const [loading, setLoading]=useState(true)
    const router=useRouter()
    const {token}=useAuth()
    useEffect(()=>{

    }, [])

    useEffect(()=>{setLoading(true);setLoading(false)}, [(router.query.name)])

    if(loading){
        return <Loader/>
    }

    if(token!==null){
        switch (router.query.name) {
            case "decoder": {
                return <Decoder/>
            }
            case "link-save": {
                return <LinkSave/>
            }
            case "secrets": {
                return <Secrets/>
            }
            case "info-device":{
                return <InfoDevice/>
            }
            case "settings":{
                return <Settings/>
            }

            default: {
                return <Custom404/>
            }
        }
    }
    return <Custom404/>






};

export default Name;