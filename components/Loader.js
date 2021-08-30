import React from 'react';
import {ScaleLoader} from 'react-spinners'
import {useThemeDetector} from "../toolsOfProject"

const Loader = () => {
    const {isDarkTheme}=useThemeDetector()
    return (
        <div className='loader'>
            <ScaleLoader loading={true} color={isDarkTheme?'#f1f1f1':'#343A40'} />
        </div>
    );
};

export default Loader;