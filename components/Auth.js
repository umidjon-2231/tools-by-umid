import React, {useEffect} from "react"
import {AvForm, AvInput} from "availity-reactstrap-validation"
import {useHttp} from "../hooks/https.hook"
import {useAuth} from "../hooks/auth.hook"
import Loader from "../components/Loader"
import {useRouter} from "next/router"
import {toast} from "react-toastify"


export default function Auth() {
    const {loading, error, request, clearError}=useHttp()
    const auth=useAuth()
    const router=useRouter()

    useEffect(()=>{

    }, [])

    const loginHandler=async (events, value)=>{
        const password=value.password
        try {
            const data=await request('/api/auth/login', 'POST', {password})
            console.log(data)
            if(data.status!==200){
                toast.error(error)
                console.log(error)
                return;
            }
            auth.login(data.token, data.userId)
            toast.success("Access denied")


        }catch (e) {}
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center ">Tools of Umid</h1>
            <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
            <div className="row">
                <div className="col-sm-4 col-12 col-md-8 col-lg-4 offset-md-2 offset-lg-4">
                    <div className="card">
                        <AvForm onValidSubmit={loginHandler}>
                            <div className="card-body">
                                <AvInput type="password" name="password" placeholder="Password"/>
                            </div>
                            <div className="card-footer py-1">
                                <button className="btn btn-light border-success d-block ml-auto" type="submit">Login</button>
                            </div>
                        </AvForm>

                    </div>
                </div>
            </div>

        </div>
    )
}
