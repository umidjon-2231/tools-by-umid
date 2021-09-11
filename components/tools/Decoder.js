import React from 'react';
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "../Navbar"

const Decoder = () => {
    const router=useRouter()
    return (
        <Navbar name='Decoder'>
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

export default Decoder;