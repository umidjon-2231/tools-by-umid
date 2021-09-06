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
import {useAuth} from "../../hooks/auth.hook"

const LinkSave = () => {
    const [modal, setModal]=useState(false)
    const [filterModal, setFilterModal]=useState(false)
    const [viewModal, setViewModal]=useState(false)
    const [viewLink, setViewLink]=useState({})
    const [deleteModal, setDeleteModal]=useState(false)
    const [loading, setLoading]=useState(false)
    const [links, setLinks]=useState([])
    const [content, setContent]=useState([])
    const [editItem, setEditItem]=useState({})
    const [deleteItem, setDeleteItem]=useState('')
    const [filterMode, setFilterMode]=useState({
        category: 'none',
        firstNew: true,
    })

    const {isDarkTheme, nameTheme}=useThemeDetector()
    const router=useRouter()
    const {request}=useHttp()
    const {token}=useAuth()

    useEffect(()=>{
       getLinks()
    }, [])

    const toggle=()=>{
        if(modal && editItem._id){
            setEditItem({})
        }
        setModal(!modal)

    }
    const toggleFilter=()=>{
        setFilterModal(!filterModal)
    }
    const toggleDelete=()=>{
        if(deleteModal){
            setDeleteItem('')
        }
        setDeleteModal(!deleteModal)
    }
    const toggleView=()=>{
        setViewModal(!viewModal)
    }

    const getLinks=async ()=>{
        setLoading(true)

        const tokenGet=await JSON.parse(localStorage.getItem(process.env.storageName))
        const res=await request('/api/link/get-link', 'GET', null,
            {
                Authorization: `Bearer ${tokenGet?.token}`
            })
        if(res.data){
            await setContent(res.data)
            await filterChange('', filterMode, res.data)
        }
        if(res.status===400){

        }



        setLoading(false)
    }

    const newLink= async (event, values)=>{
        setLoading(true)
        if(values.link.substr(0, 8)!=='https://' && values.link.substr(0, 8)!=='http://'){
            values.link="https://"+values.link
        }
        if(editItem._id){
            const res=request('/api/link/edit-link','POST',
                {...values, _id: editItem._id, date: editItem.date },
                {
                    Authorization: `Bearer ${token}`
                })
            if(res.status===200){
                toast.success('Link edited')
            }else{
                setModal(false)
                setLoading(false)
            }

        }else{
            const res=await request('/api/link/save-link', 'POST', {...values, date: Date.now()},
                {
                    Authorization: `Bearer ${token}`
                })
            if(res.status===201){
                toast.success(res.message)
            }else{
                setModal(false)
                setLoading(false)
            }
        }

        setModal(false)
        await getLinks()
    }

    const deleteLink=async ()=>{
        setLoading(true)
        const res=await request('/api/link/delete-link', 'POST', {id: deleteItem._id},
            {
                Authorization: `Bearer ${token}`
            })
        if(res.status===200){
            toast.success('Link deleted')
        }else{
            toast.error(res.message)
        }
        getLinks()
        toggleDelete()
    }

    const filterChange=(e, value, data=null)=>{
        if(!data){
            data=content
        }
        let result=[]
        setFilterMode(value)
        if(value.category==='none'){
            result=data
        }else{
            result=filterCategory(value.category, data)
        }
        if(value.firstNew){
            result=result.sort((a,b)=>{return b.date-a.date})
        }else{
            result=result.sort((a,b)=>{return a.date-b.date})
        }
        setLinks(result)
        setFilterModal(false)
    }

    const filterCategory=(name, data)=>{
        let result=[]
        data.map((i,n)=>{
            if(i.category===name){
                result.push(i)
            }
        })
        return  result
    }

    const searchResult=async (name)=>{
        let filteredArray=[]
        filteredArray=await content.filter(a=>{
            return a.link.toUpperCase().includes(name.toUpperCase()) || a.description.toUpperCase().includes(name.toUpperCase())
        })
        setLinks(filteredArray)

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
                            className={`btn ${isDarkTheme?'btn-dark border-secondary':'btn-secondary'}`}
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                        >{editItem._id?'Edit':'Add'}</button>
                    </ModalFooter>
                </AvForm>
            </Modal>

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader>
                    Delete link
                </ModalHeader>
                <ModalBody>
                    Do you want to delete this link?(Click to card for view info of link)
                    <div className="col-12 content my-3">
                        <div className="custom-card" onClick={()=>{setViewLink(deleteItem);toggleView()}}>
                            {deleteItem._id?<div>
                            <a href={deleteItem?.link} rel='noreferrer' target='_blank'>{deleteItem?.link}</a>
                            </div>:''}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='py-2 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={toggleDelete}>Cancel</button>
                    <button className="btn btn-danger" onClick={deleteLink}>Delete</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={viewModal} toggle={toggleView}>
                <ModalHeader>Vew link</ModalHeader>
                <ModalBody>
                    <AvForm>
                        <AvField label='Link:' type='text' name='link' value={viewLink?.link} disabled={true}/>
                        <AvField label='Description:' rows={5} type='textarea' name='description' value={viewLink?.description} disabled={true}/>
                        <AvField label='Category:' type='text' name='category' value={viewLink?.category} disabled={true}/>
                    </AvForm>
                </ModalBody>
                <ModalFooter className='py-2'>
                    <button
                        type='button'
                        className={`btn ${isDarkTheme?'btn-dark border-secondary':'btn-secondary'}`}
                        onClick={toggleView}
                    >Cancel</button>
                    <a
                        href={viewLink?.link}
                        className={`btn ${isDarkTheme?'btn-dark border-primary':'btn-primary'}`}
                        target='_blank' rel='noreferrer'
                    >Open</a>
                </ModalFooter>
            </Modal>

            <Modal isOpen={filterModal} toggle={toggleFilter}>
                <ModalHeader>
                    Filter
                </ModalHeader>
                <AvForm onValidSubmit={filterChange}>
                    <ModalBody>
                        <AvField type='select' name='category' value={filterMode.category}>
                            <option value="none">None</option>
                            <option value="useful">Useful</option>
                            <option value="interesting">Interesting</option>
                            <option value="programming">Programming</option>
                            <option value="information">Information</option>
                            <option value="important">Important</option>
                            <option value="my-websites">My websites</option>
                            <option value="other">Other</option>
                        </AvField>
                        <AvField label='First new' type='checkbox' name='firstNew' value={filterMode.firstNew}/>


                    </ModalBody>
                    <ModalFooter className='py-2'>
                        <div className="d-flex w-100 justify-content-between">
                            <button
                                type='button'
                                onClick={toggleFilter}
                                className={`btn ${isDarkTheme?'btn-dark border-secondary':'btn-secondary'}`}>Cancel</button>
                            <div className="">
                                <button
                                    type='submit'
                                    className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                                >Apply</button>
                            </div>

                        </div>
                    </ModalFooter>
                </AvForm>

            </Modal>

            <div className="container homepage">
                <h1 className="mt-5 text-center">Link save</h1>
                <div className=" col-10 mx-auto my-4 bg-info" style={{height: "2px"}}/>
                <div className="row align-items-center" style={{paddingLeft: 10, paddingRight: 10}}>

                    <div className="col-lg-8 col-sm-6 col-12">
                        <div className="col-lg-6 col-12 input-group px-0">
                            <input type="search" name="search"
                                   className='form-control' autoComplete='off'
                                   placeholder='Search'
                                   id="search" onChange={(e)=>{searchResult(e.target.value)}}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent">
                                    <img src="/icons/search-icon.png" alt="" width={20}/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12 mt-3 mt-sm-0 d-flex justify-content-end">

                            <button
                                type={'button'}
                                onClick={toggleFilter}
                                className={`btn border-primary ${isDarkTheme?'btn-dark':'btn-light'}`}>
                                <img src="/icons/filter-icon.png" style={{marginRight: 5}} alt="" width={20}/>
                                Filter
                            </button>

                            <button
                                className={`btn ml-3 ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                                type='button'
                                onClick={toggle}

                            >Add link</button>

                    </div>



                </div>
                <div className="content mt-3">
                    <div className="row">

                        {links.length!==0?links.map((i,n)=>{
                            const domainName=(url)=>{
                                url=url.replace('http://', '')
                                url=url.replace('https://', '')
                                let end=url.indexOf('/')
                                if(end<0){
                                    end=url.length
                                }
                                return url.slice(0, end)
                            }

                            return(
                                <div key={i._id} className="col-lg-4 col col-sm-6 my-2">
                                        <div className="custom-card hover" onClick={()=>{setViewLink(i);toggleView()}}>
                                            <UncontrolledDropdown size='sm'>
                                                <DropdownToggle color='transparent'
                                                                onClick={(event)=>{event.stopPropagation()}}
                                                                className={`ml-auto d-block`}>
                                                    <img
                                                        src={`/icons/three-points-icon-${nameTheme}.png`}
                                                        alt=""/>
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    size='sm'
                                                    className={`${isDarkTheme?'bg-dark':'bg-light'} border-primary `}>

                                                    <DropdownItem
                                                        size='sm'
                                                        className={`text-primary w-100`}
                                                        onClick={(event)=>{
                                                            setEditItem(i);
                                                            toggle();
                                                            event.stopPropagation()}}
                                                    >Edit</DropdownItem>
                                                    <DropdownItem
                                                        size='sm'
                                                        className={`text-info w-100`}
                                                        onClick={(event)=>{
                                                            setViewLink(i);
                                                            toggleView();
                                                            event.stopPropagation()}}
                                                    >View</DropdownItem>
                                                    <DropdownItem
                                                        size='sm'
                                                        className={`text-danger w-100`}
                                                        onClick={(event)=>{
                                                            setDeleteItem(i);
                                                            toggleDelete();
                                                            event.stopPropagation()}}
                                                    >Delete</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <p><a href={i.link}
                                                  onClick={(event)=>{event.stopPropagation()}}
                                                  rel='noreferrer' target='_blank'>{domainName(i.link)}</a></p>


                                            <div className={`body-link ${isDarkTheme?'text-light':'text-dark'}`}>
                                                <h5>{i.description}</h5>
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