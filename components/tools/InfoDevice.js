import React from 'react';
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"

const InfoDevice = () => {
    const router=useRouter()
    return (
        <div>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            <div className="container">
                <h1 className="mt-5 text-center">Info of device</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
            </div>
        </div>
    );
};

export default InfoDevice;