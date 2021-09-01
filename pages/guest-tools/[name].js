import React, {useEffect} from 'react';
import {useRouter} from "next/router"
import InfoDevice from "../../components/tools/InfoDevice"
import Custom404 from "../404"

const Name = () => {
    const router=useRouter()
    useEffect(()=>{

    }, [])

    switch(router.query.name){
        case 'info-device':{
            return <InfoDevice/>
        }

        default: {
            return <Custom404/>
        }

    }

};

export default Name;