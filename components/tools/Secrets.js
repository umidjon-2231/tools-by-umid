import React from 'react';
import {useAuth} from "../../hooks/auth.hook"

const Secrets = () => {
    const {token, logout}=useAuth()
    const jwt=require('jsonwebtoken')
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
            Secrets
        </div>
    );
};

export default Secrets;