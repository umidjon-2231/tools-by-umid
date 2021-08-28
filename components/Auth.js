import React, {useEffect, useState} from "react"
import {AvForm, AvInput} from "availity-reactstrap-validation"
import {useHttp} from "../hooks/https.hook"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import {useThemeDetector} from "../toolsOfProject"


export default function Auth() {
    const [darkTheme, setDarkTheme]=useState(false)
    const {loading, error, request}=useHttp()
    const auth=useAuth()
    const router=useRouter()
    const {isDarkTheme}=useThemeDetector()

    useEffect(()=>{


    }, [])


    const loginHandler=async (events, value)=>{
        const password=value.password
        try {
            const data=await request('/api/auth/login', 'POST', {password})
            if(data.status!==200){
                toast.error(error)
                console.log(error)
                return;
            }
            router.push('/tools')
            auth.login(data.token, value.password)

            toast.success('Access allowed', {position: 'bottom-right'})


        }catch (e) {}
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center">Tools of Umid</h1>
            <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
            <div className="row">
                <div className="col-sm-4 col-12 col-md-8 col-lg-4 offset-md-2 offset-lg-4">
                    <div className="card">
                        <AvForm onValidSubmit={loginHandler}>
                            <div className="card-body">
                                <AvInput type="password" name="password" placeholder="Password"/>
                            </div>
                            <div className="card-footer py-1">
                                <button disabled={loading}
                                        className={`btn ${isDarkTheme?'btn-dark':'btn-light'} border-success d-block ml-auto`}
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
