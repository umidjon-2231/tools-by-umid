import React, {useEffect} from 'react';
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "../Navbar"
import Title from "../Title";

const Decoder = () => {
    const router=useRouter()

    useEffect(()=>{})


    return (
        <Navbar name='Decoder'>
            <Title/>
            <div className="container">

            </div>
        </Navbar>

    );
};

export default Decoder;