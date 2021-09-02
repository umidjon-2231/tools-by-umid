import React, {useState, useEffect} from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import {useThemeDetector} from "../../toolsOfProject"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import {useHttp} from "../../hooks/https.hook"
import {toast} from "react-toastify"
import Loader from "../Loader"

const LinkSave = () => {
    const [modal, setModal]=useState(false)
    const [loading, setLoading]=useState(false)
    const [links, setLinks]=useState([])
    const {isDarkTheme}=useThemeDetector()
    const router=useRouter()
    const {request}=useHttp()
    useEffect(()=>{
        getLinks()
    }, [])

    const toggle=()=>setModal(!modal)

    const getLinks=async ()=>{
        setLoading(true)
        const res=await request('/api/link/get-link', 'GET')
        setLinks(res.data)
        setLoading(false)
    }

    const newLink= async (event, values)=>{
        setLoading(true)
        if(values.link.substr(0, 8)!=='https://' && values.link.substr(0, 8)!=='http://'){
            values.link="https://"+values.link
        }
        console.log(values)
        const res=await request('/api/link/save-link', 'POST', {...values, date: Date.now()})
        if(res.status===201){
            toast.success(res.message)
        }
        getLinks()
        toggle()
    }

    return (
        <div>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            {loading?<Loader/>:''}


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Add new link
                </ModalHeader>
                <AvForm onValidSubmit={newLink}>
                    <ModalBody>
                        <AvField
                            type='text'
                            name="link"
                            placeholder="Link"
                            autoComplete='off'
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a link'}
                            }}
                        />
                        <AvField
                            type='textarea'
                            rows={5}
                            name="description"
                            placeholder="Description"
                            autoComplete='off'
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a description'},
                                minLength: {value: 5, errorMessage: 'Min length 5 characters'}
                            }}
                        />
                        <AvField
                            type='select'
                            name='category'
                            label="Category"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </AvField>
                    </ModalBody>
                    <ModalFooter className='py-2'>
                        <button
                            type='button'
                            onClick={toggle}
                            className={`btn border-secondary ${isDarkTheme?'btn-dark':'btn-light'}`}
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn border-success ${isDarkTheme?'btn-dark':'btn-light'}`}
                        >Add</button>
                    </ModalFooter>
                </AvForm>
            </Modal>

            <div className="container homepage">
                <h1 className="mt-5 text-center">Link save</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="">
                {/*    todo:filter mode    */}
                    <button
                        className={`btn border-success d-block ml-auto ${isDarkTheme?'btn-dark':'btn-light'}`}
                        type='button'
                        onClick={toggle}

                    >Add link</button>
                </div>
                <div className="content">
                    <div className="row">
                        {links.length?links.map((i,n)=>{
                            return(
                                <div key={i._id} className="col-lg-4 col col-sm-3">
                                    <a rel='noreferrer' href={i.link} target="_blank" className='nav-link'>
                                        <div className="custom-card">
                                            <p>{i.link}</p>

                                            <div className={`body ${isDarkTheme?'text-light':'text-dark'}`}>
                                                {i.description}

                                            </div>
                                        </div>
                                    </a>
                                </div>

                            )
                        }):'Not data yet'}
                    </div>
                </div>


            </div>
        </div>

    );
};

export default LinkSave;