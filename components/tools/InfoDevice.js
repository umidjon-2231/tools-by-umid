import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router"
import Loader from "../Loader"
import {useHttp} from "../../hooks/https.hook"
import axios from "axios"
import {useThemeDetector} from "../../toolsOfProject"
import Navbar from "../Navbar"
import Title from "../Title";

const InfoDevice = () => {
    const [content, setContent]=useState([])
    const [loading, setLoading]=useState(true)
    const {isDarkTheme, nameTheme}=useThemeDetector()


    const router=useRouter()
    const [change, setChange]=useState(false)
    useEffect(()=>{
        info()
        window.addEventListener('resize', ()=>{setChange(!change)})
    }, [])

    useEffect(()=>{
        info()
    }, [change])

    const info=async ()=>{
        setLoading(true)
        let infos=[]
        const res=await axios.get('https://geolocation-db.com/json/')
        infos.push({name:"IPv4", value: res.data.IPv4})
        infos.push({name: 'Browser width', value: window.innerWidth})
        infos.push({name: 'Browser height', value: window.innerHeight})
        infos.push({name: 'Screen width', value: screen.width})
        infos.push({name: 'Screen height', value: screen.height})
        infos.push({name: 'Available width', value: screen.availWidth})
        infos.push({name: 'Available height', value: screen.availHeight})
        infos.push({name: 'Color depth', value: screen.colorDepth})
        infos.push({name: 'Dark theme', value: nameTheme})
        infos.push({name: 'App name', value: navigator.appName})
        infos.push({name: 'App code name', value: navigator.appCodeName})

        infos.push({name: 'Platform', value: navigator.platform})
        infos.push({name: 'Browser name', value: navigator.userAgent})

        // infos.push({name: '', value: ''})


        setContent(infos)
        setLoading(false)

    }






    return (
        <Navbar name='Info of device'>
            <Title/>
            {loading? <Loader/>:''}

            <div className="container homepage">
                <div className="content">
                    <div className="row">

                        {content.map((i,n)=>{
                            return(
                                <div key={n}
                                     className={`
                                     ${n===content.length-1?
                                         'col-12 col-lg-12 col-sm-12':'col-lg-3 col-6  col-sm-4'}
                                       my-3`}>
                                    <div className="custom-card">
                                        <b>{i.name}</b>: {i.value}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-12 col-sm-6 col-lg-2 ml-lg-auto">
                            <button
                                type='button'
                                onClick={()=>setChange(!change)}
                                className={`btn w-100 border-success ${isDarkTheme?'btn-dark':'btn-light'}`}
                            >Refresh</button>
                        </div>


                    </div>



                </div>

            </div>
        </Navbar>
    );
};

export default InfoDevice;