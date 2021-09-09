import {useEffect, useState} from "react"
import {toast} from "react-toastify"


export const useThemeDetector = () => {

    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(false);


    useEffect(async () => {
        let theme=await getCurrentTheme()
        await setIsDarkTheme(theme)

    }, []);

    return {isDarkTheme, nameTheme: isDarkTheme?'dark':'light'};
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






