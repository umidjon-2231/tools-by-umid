import React from 'react';
import {ScaleLoader} from 'react-spinners'
import {useThemeDetector} from "../toolsOfProject"
import {NextSeo} from "next-seo"

const Loader = () => {
    const {isDarkTheme}=useThemeDetector()
    return (
        <div className='loader'>
            <NextSeo title='Loading...'/>
            <ScaleLoader loading={true} color={isDarkTheme?'#f1f1f1':'#343A40'} />
        </div>
    );
};

export default Loader;