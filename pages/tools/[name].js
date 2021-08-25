import React from 'react';
import {useAuth} from "../../hooks/auth.hook"
import Auth from "../../components/Auth"
import {useRouter} from "next/router"
import Vinejer from "../../components/tools/Vinejer"
import LinkSave from "../../components/tools/LinkSave"
import Custom404 from "../404"
import Index from "../index"

const Name = () => {
    const router=useRouter()
    const {token}=useAuth()
    if(!!token){
        switch (router.query.name) {
            case "vinejer": {
                return <Vinejer/>
            }
            case "link-save": {
                return <LinkSave/>
            }
            default: {
                return <Custom404/>
            }
        }
    }
    return <Index/>




};

export default Name;