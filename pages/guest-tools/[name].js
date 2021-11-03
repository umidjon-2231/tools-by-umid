import React, {useEffect} from 'react';
import {useRouter} from "next/router"
import InfoDevice from "../../components/tools/InfoDevice"
import Custom404 from "../404"

const Name = ({name}) => {
    const router=useRouter()
    useEffect(()=>{}, [])

    switch(name){
        case 'info-device':{
            return <InfoDevice/>
        }
        default: {
            return <Custom404/>
        }
    }

};

export default Name;
Name.getInitialProps=async (ctx)=>{
    return {name: ctx.query.name}
}