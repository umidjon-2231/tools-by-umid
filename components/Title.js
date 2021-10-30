import React from 'react';
import {useRouter} from "next/router";
import Head from "next/head";

const Title = ({name}) => {
    const router=useRouter()
    return (
        <Head>
            <title>{!name? router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1):name} | Tools of Umid</title>
        </Head>
    );
};

export default Title;