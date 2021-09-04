import React from 'react';
import {useAuth} from "../hooks/auth.hook"
import Custom404 from "../pages/404"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"

const Settings = () => {
    const {token, logout}=useAuth()
    const router=useRouter()

    if(!!token){
        return (
            <div>
                <NextSeo
                    title={`Tools of Umid | ${
                        router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                    }`}
                />
                <div className="container ">
                    <h1 className="mt-5 text-center">Settings</h1>
                    <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                </div>

            </div>
        );
    }
    return <Custom404/>


};

export default Settings;