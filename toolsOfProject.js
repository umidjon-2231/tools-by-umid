import {useEffect, useState} from "react"


export const useThemeDetector = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);


    useEffect(() => {
        const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkTheme(getCurrentTheme)
    }, []);

    return {isDarkTheme, nameTheme: isDarkTheme?'dark':'light'};
}







