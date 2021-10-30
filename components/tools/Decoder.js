import React, {useEffect} from 'react';
import {useRouter} from "next/router"
import Navbar from "../Navbar"
import Title from "../Title";

const Decoder = () => {
    const router=useRouter()

    useEffect(()=>{})


    return (
        <Navbar name='Decoder'>
            <Title name='Decoder'/>
            <div className="container">

            </div>
        </Navbar>

    );
};

export default Decoder;