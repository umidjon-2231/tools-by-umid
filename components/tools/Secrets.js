import React, {useState} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "../Navbar"
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {useThemeDetector} from "../../toolsOfProject"

const Secrets = () => {
    const [checkModal, setCheckModal]=useState(false)
    const {token, logout}=useAuth()

    const {isDarkTheme}=useThemeDetector()

    const router=useRouter()
    const toggle=()=>{setCheckModal(!checkModal)}

    const checkPassword=(event, values)=>{
        toggle()
    }

    return (
        <Navbar name='Secrets'>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            <Modal isOpen={checkModal} toggle={toggle}>
                <ModalHeader>
                    Password
                </ModalHeader>
                <AvForm onValidSubmit={checkPassword}>
                    <ModalBody>
                        <AvField type='text' name='login' value={'admin'} className='d-none'/>
                        <AvField
                            type='password'
                            name='password'
                            placeholder={'Enter password'}
                            validate={{
                                required: {value: true, errorMessage: 'Enter password for view secrets'},
                                minLength: {value: 6, errorMessage: 'Password must be minimum 6 length'}
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="submit"
                            className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                        >Open secrets</button>
                    </ModalFooter>
                </AvForm>

            </Modal>
            <div className="container">
                {/*<span className="stamp">Top secret</span>*/}
                <div className="content">
                    <div className="text-center secret-icon">
                        <div>
                            <img src="/icons/file-icon.png" alt="" className=''/>
                        </div>
                        <div onClick={toggle}>
                            <img src="/icons/lock-icon.png" alt=""/>
                        </div>

                    </div>
                </div>


            </div>
        </Navbar>

    );
};

export default Secrets;