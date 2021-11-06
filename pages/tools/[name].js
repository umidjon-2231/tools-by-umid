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
import {getProps} from "../../page-get-props/link-save";
import {getToken} from "../../toolsOfProject";
import Iframe from "../../components/tools/Iframe";
import absoluteUrl from "next-absolute-url/index";

const Name = ({props, token}) => {
    const [loading, setLoading]=useState(true)
    const router=useRouter()

    useEffect(()=>{
        setLoading(false)
    }, [])


    if(loading){
        return <Loader/>
    }

    if(token!==null){
        switch (router.query.name) {
            case "decoder": {
                return <Decoder props={props}/>
            }
            case "link-save": {
                return <LinkSave props={props}/>
            }
            case "secrets": {
                return <Secrets props={props}/>
            }
            case "info-device":{
                return <InfoDevice props={props}/>
            }
            case "settings":{
                return <Settings props={props}/>
            }
            case "iframe":{
                return <Iframe/>
            }
            default: {
                return <Custom404/>
            }
        }
    }
    return <Custom404/>
};

Name.getInitialProps=async (ctx)=>{
    let token=await getToken(ctx)
    if(!token){
        return {token: null}
    }
    let props={}
    let host;
    if(ctx.req){
        host=absoluteUrl(ctx.req).origin
    }else {
        host=""
    }
    props=await getProps(ctx, token, host)
    return {props, token}
}

export default Name;