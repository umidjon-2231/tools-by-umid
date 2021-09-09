import React, {useEffect, useState} from 'react';
import {useAuth} from "../hooks/auth.hook"
import {tools, useThemeDetector} from "../toolsOfProject"
import Link from "next/link"
import Loader from "./Loader"
import {NextSeo} from "next-seo"

const Homepage = () => {

    const {isDarkTheme}=useThemeDetector()



    useEffect(()=>{

        // setContent(content.sort((a, b)=>
        //    a.name.localeCompare(b.name)
        // ))



    }, [])





    return (
        <div>
            <NextSeo
             title="Tools of Umid | Homepage"
            />
            <div className="container homepage">
                <h1 className="mt-5 text-center">Tools of Umid</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="content">
                    <div className="row">
                        {tools.map((i, n)=>{
                            return(
                                <div key={n} className="col-6 col-sm-4 col-lg-3 my-3">
                                    <Link href={'/tools'+i.url} >
                                        <div className="custom-card hover focus">
                                            <div className="text-center">
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