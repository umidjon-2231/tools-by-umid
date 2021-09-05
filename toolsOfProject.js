import {useEffect, useState} from "react"
import {toast} from "react-toastify"


export const useThemeDetector = () => {

    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(false);


    useEffect(() => {
        setIsDarkTheme(getCurrentTheme())
    }, []);

    return {isDarkTheme, nameTheme: isDarkTheme?'dark':'light'};
}







