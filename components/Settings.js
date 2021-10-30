import React, {useState, useEffect} from 'react';
import {useAuth} from "../hooks/auth.hook"
import Custom404 from "../pages/404"
import {useRouter} from "next/router"
import Navbar from "./Navbar"
import Loader from "./Loader"
import Title from "./Title";

const Settings = () => {
    const [loading, setLoading]=useState(true)
    const {token, logout}=useAuth()
    const router=useRouter()

    useEffect(()=>{
        setLoading(false)
    }, [])

    if(loading){
        return <Loader/>
    }


    return (
        <Navbar name='Settings'>
            <Title name='Settings'/>
            <div className="container ">
                <button className='btn btn-primary' onClick={()=>{setLoading(true);logout()}}>Logout</button>
            </div>

        </Navbar>
    );
};

export default Settings;