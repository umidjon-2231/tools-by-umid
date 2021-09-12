import React from 'react';
import {useAuth} from "../../hooks/auth.hook"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "../Navbar"

const Secrets = () => {
    const {token, logout}=useAuth()
    const jwt=require('jsonwebtoken')
    const router=useRouter()

    return (
        <Navbar name='Secrets'>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            <div className="container">
                <span className="stamp">Top secret</span>
            </div>
        </Navbar>

    );
};

export default Secrets;