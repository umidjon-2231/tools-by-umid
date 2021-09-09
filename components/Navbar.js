import React from 'react';
import {stack as Menu } from 'react-burger-menu'
import Link from "next/link"
import {tools} from "../toolsOfProject"
import {useRouter} from "next/router"


const Navbar = ({name, children}) => {
    let styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            top: '56px',
            right: '10%'
        },
        bmBurgerBars: {
            background: '#007BFF'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }

    const router=useRouter()

    return (
        <div className='container homepage pl-2 right' id='outer-container' >
            <div className="d-flex container justify-content-between ">
                <h1 className="mt-5 " >{name}</h1>
                <Menu styles={styles} noOverlay right outerContainerId={ "outer-container"} pageWrapId={ "page-wrap" }>
                    <div className="d-flex">
                        <p className='font-weight-bold' style={{cursor: 'pointer'}} onClick={()=>{router.back()}}>&#x2190;Back</p>
                    </div>
                    {router.pathname!=='/tools'?
                        <div className="d-flex">
                            <img src="/icons/homepage-icon.png" alt="" width={40} style={{marginRight: 10}}/>
                            <Link href={'/tools'}>Homepage</Link>
                        </div>:''
                    }

                    {tools.map(i=>{
                        return(
                            <div className="d-flex align-items-center my-3">
                                <img src={`/images/${i.src}`} alt="" width={40} style={{marginRight: 10}}/>
                                <Link href={"/tools"+i.url}>{i.name}</Link>
                            </div>
                        )
                    })}

                </Menu>
            </div>


            <main id='page-wrap'>
                <div className=" col mx-auto mt-2 mb-4 bg-info" style={{height: "2px"}}/>
                <div className="">
                    {children}
                </div>

            </main>
        </div>
    );
};

export default Navbar;