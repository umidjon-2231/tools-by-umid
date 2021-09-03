import {useEffect, useState} from "react"


export const useThemeDetector = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);


    const mqListener = (e => {
        setIsDarkTheme(e.matches);
    });

    useEffect(() => {
        const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkTheme(getCurrentTheme)

        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mqListener);
        return () => darkThemeMq.removeListener(mqListener);

    }, []);

    return {isDarkTheme, nameTheme: isDarkTheme?'dark':'light'};
}







