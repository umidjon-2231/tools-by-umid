import React from 'react';
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

const Title = ({name}) => {
    const router=useRouter()
    return (
        <NextSeo
            title={`${!name?
                router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1):name
            } | Tools of Umid`}
        />
    );
};

export default Title;