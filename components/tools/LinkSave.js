import React from 'react';
import {useAuth} from "../../hooks/auth.hook"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"

const LinkSave = () => {

    const {token, logout}=useAuth()
    const jwt=require('jsonwebtoken')
    const router=useRouter()
    setInterval(()=>{
        if(token!=null){
            try {
                const verify=jwt.verify(token, 'Umidjon2231')
            }catch (e) {
                logout()
            }
        }
    }, 900000)
    return (
        <div>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            <div className="container">

                <h1 className="mt-5 text-center">Link save</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
            </div>
        </div>

    );
};

export default LinkSave;