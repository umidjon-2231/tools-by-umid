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







