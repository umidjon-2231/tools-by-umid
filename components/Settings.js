import React from 'react';
import {useAuth} from "../hooks/auth.hook"
import Custom404 from "../pages/404"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "./Navbar"

const Settings = () => {
    const {token, logout}=useAuth()
    const router=useRouter()

    if(!!token){
        return (
            <Navbar name='Settings'>
                <NextSeo
                    title={`Tools of Umid | ${
                        router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                    }`}
                />
                <div className="container ">
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                </div>

            </Navbar>
        );
    }
    return <Custom404/>


};

export default Settings;