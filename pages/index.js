import {useAuth} from "../hooks/auth.hook"
import {AuthContext} from "../context/AuthContext"
import Loader from "../components/Loader"
import Auth from "../components/Auth"
import {useRouter} from "next/router"
import {useCheckToken} from "../hooks/checkToken"

export default function Home() {
  const {token, login, userId, logout, ready}=useAuth()

  const router=useRouter()
  // useCheckToken()
  if(token!==null){
    router.push("/tools")
  }
  return <Auth/>;
}
