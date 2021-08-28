import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {AvInput, AvForm} from "availity-reactstrap-validation"
import {useThemeDetector} from "../toolsOfProject"
import {useCheckPassword} from "../hooks/password.hook"

const Password = () => {

    const {modal, toggle}=useCheckPassword()
    const {isDarkTheme}=useThemeDetector()


    const checkPassword=(event, {password})=>{

    }
    useEffect(()=>{

    })



    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                Password check!
            </ModalHeader>
            <AvForm onValidSubmit={checkPassword}>
                <ModalBody>
                    <AvInput
                        type='password'
                        name='password'
                        placeholder="Password"
                    />
                </ModalBody>
                <ModalFooter className="py-1">
                    <button
                        className={`btn ${isDarkTheme?'btn-dark':'btn-light'} border-success d-block ml-auto`}
                        type="submit">Submit</button>
                </ModalFooter>
            </AvForm>
        </Modal>
    );
};

export default Password;