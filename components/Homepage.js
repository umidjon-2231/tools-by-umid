import React, {useEffect, useState} from 'react';
import {useAuth} from "../hooks/auth.hook"

const Homepage = () => {
    const [time, setTime]=useState({})
    const {token, logout}=useAuth()
    const jwt=require('jsonwebtoken')

    useEffect(()=>{


    }, [])

    return (
        <div>
           Homepage
        </div>
    );
};

export default Homepage;