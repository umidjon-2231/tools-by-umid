import {useAuth} from "../hooks/auth.hook"
import Auth from "../components/Auth"
import {useRouter} from "next/router"
import {getCookies, getToken} from "../toolsOfProject";
import jwt from "jsonwebtoken";

export default function Home() {
  const {token}=useAuth()
  return <Auth/>;
}

Home.getInitialProps=async (ctx)=>{
  let token=await getToken(ctx)
  if(token){
    if(ctx.res){
      ctx.res.writeHead(302, { Location: '/tools' }).end()
    }else{
      window.location="/tools"
    }

  }
  return {}
}
