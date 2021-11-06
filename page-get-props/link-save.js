import axios from "axios";

export const getProps=async (ctx, token, host)=>{
    let errors=null, links=[]
    try {
        const res=await axios.get(`${host}/api/link/get-link`,  {headers: {Authorization: `Bearer ${token}`}})
        if(res.data.status===200){
            links=res.data.data
        }else{
            errors=res.data.message
        }
    }catch (e) {
        errors=e.message
    }


    return {token, errors, links}

}