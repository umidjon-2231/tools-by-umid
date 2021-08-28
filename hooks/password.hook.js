import {useCallback, useState} from "react"


export const useCheckPassword=()=>{
    const [modal, setModal]=useState(false)
    const [check, setCheck]=useState(false)

    const toggle=useCallback(()=>{setModal(!modal); }, [])
    const checked=useCallback(()=>setCheck(!check), [])


    return {modal, check, toggle, checked}
}