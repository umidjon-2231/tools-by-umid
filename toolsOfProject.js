import {useEffect, useState} from "react"
import {toast} from "react-toastify"


export const useThemeDetector = () => {

    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(false);


    useEffect( () => {
        let theme= getCurrentTheme()
        setIsDarkTheme(theme)

    }, []);

    return {isDarkTheme, nameTheme: isDarkTheme?'dark':'light'};
}

export const filterSpaceOfString=(text)=>{
    let newTxt=''
    for(let txt=0; txt<text.length; txt++){
        if(txt===0 && text[txt]!==' '){
            newTxt+=text[txt]
        }
        if(txt===text.length-1 && text[txt]!==' ' && txt!==0){
            newTxt+=text[txt]
        }
        if(txt!==0 && txt!==text.length-1 && (text[txt]!==' ' || text[txt+1]!==' ')){
            newTxt+=text[txt]
        }
    }
    return newTxt
}


export const tools=[
    {
        name: 'Decoder',
        url: '/decoder',
        src: 'decode-icon.png'
    },
    {
        name: 'Link save',
        url: '/link-save',
        src: 'link-blue-icon.png'
    },
    {
        name: 'Secrets',
        url: '/secrets',
        src: 'top-secret-stamp.png'
    },
    {
        name: 'Info of device',
        url: '/info-device',
        src: 'info-icon.png'
    },
    {
        name: "Settings",
        url: "/settings",
        src: 'setting-icon.png'
    }
]

export const getCookies=(cname, cookies)=>{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(cookies);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const setCookie=(cname, cvalue, expired)=> {
    const d = new Date();
    d.setTime(d.getTime() + (expired*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const deleteCookie=(name)=>{
    document.cookie=`${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}






