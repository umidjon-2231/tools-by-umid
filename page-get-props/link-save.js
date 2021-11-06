
export const getProps=async (ctx, token)=>{
    let errors=null, links=[]
    const res=await fetch("/api/link/get-link", {headers: {Authorization: `Bearer ${token}`}, method: 'GET'})
    const response=await res.json()
    if(response.status===200){
        links=response.data
    }else{
        errors=response.message
    }

    return {token, errors, links}
}