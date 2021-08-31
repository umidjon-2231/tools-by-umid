import React, {useEffect} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import Auth from "../../components/Auth"
import {useRouter} from "next/router"
import Decoder from "../../components/tools/Decoder"
import LinkSave from "../../components/tools/LinkSave"
import Custom404 from "../404"
import Secrets from "../../components/tools/Secrets"
import InfoDevice from "../../components/tools/InfoDevice"

const Name = () => {
    const router=useRouter()
    const {token}=useAuth()
    useEffect(()=>{

    })
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
            default: {
                return <Custom404/>
            }
        }
    }
    return <Custom404/>






};

export default Name;