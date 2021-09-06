import {useAuth} from "../hooks/auth.hook"
import Auth from "../components/Auth"
import {useRouter} from "next/router"

export default function Home() {
  const {token}=useAuth()


  const router=useRouter()
  if(token){
    router.push("/tools")
  }
  return <Auth/>;
}
