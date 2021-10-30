import {useAuth} from "../hooks/auth.hook"
import Auth from "../components/Auth"
import {useRouter} from "next/router"
import {getCookies} from "../toolsOfProject";
import jwt from "jsonwebtoken";

export default function Home() {
  const {token}=useAuth()
  return <Auth/>;
}

Home.getInitialProps=async (ctx)=>{
  let token;
  if(ctx.req){
    token=getCookies('token', ctx.req.headers.cookie)
  }else{
    token=getCookies('token', document.cookie)
  }
  try {
    await jwt.verify(token, 'Umidjon2231')
  }catch (e) {
    return {}
  }
  ctx.res.writeHead(302, { Location: '/tools' }).end()
  return {}
}
