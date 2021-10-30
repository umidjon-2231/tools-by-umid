import React, {useEffect, useState} from "react"
import {AvForm, AvField} from "availity-reactstrap-validation"
import {useHttp} from "../hooks/https.hook"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import {useThemeDetector} from "../toolsOfProject"
import Head from 'next/head'


export default function Auth() {
    const [darkTheme, setDarkTheme]=useState(false)
    const [loading, setLoading]=useState(false)
    const { error, request}=useHttp()
    const auth=useAuth()
    const router=useRouter()
    const {isDarkTheme}=useThemeDetector()

    useEffect(()=>{



    }, [])


    const loginHandler=async (events, value)=>{
        if(value.password===''){
            toast.error('Please enter a password')
            return
        }
        setLoading(true)
        const {password}=value
        try {
            const data=await request('/api/auth/login', 'POST', {password})
            if(data.status!==200){
                window.navigator.vibrate(290)
                setLoading(false)
                return;
            }
            await router.push('/tools')
            auth.login(data?.token)

            toast.success('Access allowed', {position: 'bottom-right'})
            // setLoading(false)
        }catch (e) {
            setLoading(false)
        }
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="container">

            <Head>
                <title>Tools of Umid</title>
            </Head>
            <h1 className="mt-5 text-center">Tools of Umid</h1>
            <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
            <div className="row">
                <div className="col-sm-4 col-12 col-md-8 col-lg-4 offset-md-2 offset-lg-4">
                    <div className="card">
                        <AvForm onValidSubmit={loginHandler}>
                            <div className="card-body">
                                <AvField type='text' name='login' value='admin' className='d-none'/>
                                <AvField
                                    type="password"
                                    name="password"
                                    placeholder="Password"

                                />
                            </div>
                            <div className="card-footer py-2 d-flex justify-content-between">
                                <button
                                    disabled={loading}
                                    className={`btn ${isDarkTheme?'btn-dark border-primary':'btn-primary'}`}
                                    type='button'
                                    onClick={()=>{
                                        setLoading(true);
                                        router.push('/guest-tools');
                                    }}
                                >I&apos;m guest</button>
                                <button disabled={loading}
                                        className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'} `}
                                        type="submit"
                                >Login</button>
                            </div>
                        </AvForm>

                    </div>
                </div>
            </div>

        </div>
    )
}
