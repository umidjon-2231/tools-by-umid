import React, {useEffect, useState} from 'react';
import {useAuth} from "../hooks/auth.hook"
import { useThemeDetector} from "../toolsOfProject"
import Link from "next/link"
import Loader from "./Loader"

const Homepage = (props) => {
    const {token, logout}=useAuth()
    const jwt=require('jsonwebtoken')
    const {isDarkTheme}=useThemeDetector()




    setInterval(()=>{
        if(token!=null ){
            try {
                jwt.verify(token, 'Umidjon2231')
            }catch (e) {
                logout()
            }
        }
    }, 900000)

    useEffect(()=>{


    }, [])
    const content=[
        {
            name: 'Decoder',
            url: '/decoder',
            src: 'decode-icon.png'
        },
        {
            name: 'Link save',
            url: '/link-save',
            src: 'link-blue-icon.png'
        },
        {
            name: 'Secrets',
            url: '/secrets',
            src: 'top-secret-stamp.png'
        },



    ]

    return (
        <div>

            <div className="container homepage">
                <h1 className="mt-5 text-center">Tools of Umid</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="content">
                    <div className="row">
                        {content.map((i, n)=>{
                            return(
                                <div key={n} className="col-6 col-sm-4 col-lg-3 my-3">
                                    <Link href={'/tools'+i.url} >
                                        <div className="custom-card">
                                            <div className="header text-center">
                                                <b>{i.name}</b>
                                            </div>
                                            <div className="body">
                                                <img src={`/images/${i.src}`} alt=""/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            )
                        })}
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Homepage;