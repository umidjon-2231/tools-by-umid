import React, {useState, useEffect} from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import {useThemeDetector} from "../../toolsOfProject"
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu, DropdownItem
} from "reactstrap"
import {useHttp} from "../../hooks/https.hook"
import {toast} from "react-toastify"
import Loader from "../Loader"

const LinkSave = () => {
    const [modal, setModal]=useState(false)
    const [deleteModal, setDeleteModal]=useState(false)
    const [loading, setLoading]=useState(false)
    const [links, setLinks]=useState([])
    const [editItem, setEditItem]=useState({})
    const [deleteItem, setDeleteItem]=useState('')

    const {isDarkTheme, nameTheme}=useThemeDetector()
    const router=useRouter()
    const {request}=useHttp()

    useEffect(()=>{
        getLinks()
    }, [])

    const toggle=()=>{
        if(modal && editItem._id){
            setEditItem({})
        }
        setModal(!modal)
    }
    const toggleDelete=()=>{
        if(deleteModal){
            setDeleteItem('')
        }
        setDeleteModal(!deleteModal)
    }

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
        if(editItem._id){
            const res=request('/api/link/edit-link','POST', {...values, _id: editItem._id})
            if(res.status===200){
                toast.success('Link edited')
            }else{
                toast.error(res.message)
                toggle()
            }

        }else{
            const res=await request('/api/link/save-link', 'POST', {...values, date: Date.now()})
            if(res.status===201){
                toast.success(res.message)
            }else{
                toast.error(res.message)
                toggle()
            }
        }

        getLinks()
        toggle()
    }

    const deleteLink=async ()=>{
        setLoading(true)
        const res=await request('/api/link/delete-link', 'POST', {id: deleteItem._id})
        if(res.status===200){
            toast.success('Link deleted')
        }else{
            toast.error(res.message)
        }
        getLinks()
        toggleDelete()
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
                    {editItem._id?'Edit link':'Add new link'}

                </ModalHeader>
                <AvForm onValidSubmit={newLink}>
                    <ModalBody>
                        <AvField
                            type='text'
                            name="link"
                            placeholder="Link"
                            autoComplete='off'
                            value={editItem?.link}
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
                            value={editItem?.description}
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a description'},
                                minLength: {value: 5, errorMessage: 'Min length 5 characters'}
                            }}
                        />
                        <AvField
                            type='select'
                            name='category'
                            label="Category"
                            value={editItem._id?editItem?.category:'1'}
                        >
                            <option value="useful">Useful</option>
                            <option value="interesting">Interesting</option>
                            <option value="programming">Programming</option>
                            <option value="information">Information</option>
                            <option value="important">Important</option>
                            <option value="my-websites">My websites</option>
                            <option value="other">Other</option>
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
                        >{editItem._id?'Edit':'Add'}</button>
                    </ModalFooter>
                </AvForm>
            </Modal>

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader>
                    Delete link
                </ModalHeader>
                <ModalBody>
                    Do you want to delete this link?
                    <div className="col-12 content my-3">
                        <div className="custom-card">
                            {deleteItem._id?<div>
                            <p><a href={deleteItem?.link} rel='noreferrer' target='_blank'>{deleteItem?.link}</a></p>
                            <div className={`body ${isDarkTheme?'text-light':'text-dark'}`}>
                                {deleteItem?.description}
                            </div></div>:''}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='py-2 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={toggleDelete}>Cancel</button>
                    <button className="btn btn-danger" onClick={deleteLink}>Delete</button>
                </ModalFooter>
            </Modal>

            <div className="container homepage">
                <h1 className="mt-5 text-center">Link save</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="mx-2">
                {/*    todo:filter mode    */}
                    <button
                        className={`btn border-success d-block ml-auto ${isDarkTheme?'btn-dark':'btn-light'}`}
                        type='button'
                        onClick={toggle}

                    >Add link</button>
                </div>
                <div className="content mt-3">
                    <div className="row">
                        {links.length!==0?links.map((i,n)=>{
                            return(
                                <div key={i._id} className="col-lg-4 col col-sm-3 my-2">
                                        <div className="custom-card hover">
                                            <UncontrolledDropdown size='sm'>
                                                <DropdownToggle color='transparent' className={`ml-auto d-block`}>
                                                    <img
                                                        src={`/icons/three-points-icon-${nameTheme}.png`}
                                                        alt=""/>
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    size='sm'
                                                    className={`${isDarkTheme?'bg-dark':'bg-light'} border-primary `}>

                                                    <DropdownItem
                                                        size='sm'
                                                        className={`${isDarkTheme?'text-light':'text-dark'}`}
                                                        onClick={()=>{setEditItem(i);toggle()}}
                                                    >Edit</DropdownItem>
                                                    <DropdownItem
                                                        size='sm'
                                                        className={`${isDarkTheme?'text-light':'text-dark'}`}
                                                        onClick={()=>{ setDeleteItem(i);toggleDelete()}}
                                                    >Delete</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <p><a href={i.link} rel='noreferrer' target='_blank'>{i.link}</a></p>

                                            <div className={`body ${isDarkTheme?'text-light':'text-dark'}`}>
                                                {i.description}

                                            </div>
                                        </div>

                                </div>

                            )
                        }):
                            <div className="col-12 text-center">
                                <img src={`/icons/not-data-yet-${nameTheme}.png`} width={50} alt=""/>
                                <p>Not data yet</p>
                            </div>
                            }
                    </div>
                </div>


            </div>
        </div>

    );
};

export default LinkSave;