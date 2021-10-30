import React, {useEffect, useState} from 'react';
import Link from "next/link"
import Title from "../../components/Title";

const Index = () => {
    const [content, setContent]=useState([
        {
            name: 'Info of device',
            url: '/info-device',
            src: 'info-icon.png'
        },
    ])
    useEffect(()=>{
        setContent(content.sort((a, b)=>
            a.name.localeCompare(b.name)
        ))
    }, [])


    return (
        <div>
            <Title name='Guest-tools'/>


            <div className="container homepage">
                <h1 className="mt-5 text-center">Guest tools</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="content">
                    <div className="row">
                        {content.sort((a, b)=>{
                            return a.name-b.name})
                            .map((i, n)=>{
                                return(
                                    <div key={n} className="col-6 col-sm-4 col-lg-3 my-3">
                                        <Link href={'/guest-tools'+i.url} >
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

export default Index;