import {useAuth} from "../hooks/auth.hook"
import {AuthContext} from "../context/AuthContext"
import Loader from "../components/Loader"
import Auth from "../components/Auth"
import {useRouter} from "next/router"

export default function Home() {
  const {token, login, userId, logout, ready}=useAuth()
  const isAuthenticated=!!token
  const router=useRouter()


  if(!ready){
    return <Loader/>
  }
  if(!!token){
  router.push("/tools")
  }
  return (<Auth/>);
}
