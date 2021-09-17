import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import {NextSeo} from "next-seo"
import {useRouter} from "next/router"
import Navbar from "../Navbar"
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledDropdown} from "reactstrap"
import {useThemeDetector} from "../../toolsOfProject"
import {useHttp} from "../../hooks/https.hook"
import Loader from "../Loader"
import {toast} from "react-toastify"

const Secrets = () => {
    const [data, setData]=useState([])
    const [content, setContent]=useState(null)
    const [editItem, setEditItem]=useState({})
    const [deleteItem, setDeleteItem]=useState({})

    const [checkModal, setCheckModal]=useState(false)
    const [newSecretModal, setNewSecretModal]=useState(false)
    const [filterModal, setFilterModal]=useState(false)

    const [loading, setLoading]=useState(false)
    const [tokenS, setTokenS]=useState(null)

    const [filterMode, setFilterMode]=useState({})
    const [secretMode, setSecretMode]=useState('loveSecret')




    const {token}=useAuth()
    const {request}=useHttp()
    const jwt=require('jsonwebtoken')

    const {isDarkTheme, nameTheme}=useThemeDetector()

    const router=useRouter()
    const toggle=()=>{setCheckModal(!checkModal)}
    const newSecretToggle=()=>{
        if(newSecretModal){
            setSecretMode('loveSecret')
        }
        setNewSecretModal(!newSecretModal)
    }
    const toggleFilter=()=>{
        setFilterModal(!filterModal)
    }

    useEffect(async ()=>{

        const tokenS=JSON.parse(sessionStorage.getItem('secret'))
        setTokenS(tokenS)
        try {
            await jwt.verify(tokenS, process.env.jwtSecret)
        }catch (e) {
            return e.message
        }
        await getSecrets()

    },[])

    const checkPassword=async (event, values)=>{
        setLoading(true)
        const data=await request('/api/auth/login', 'POST', {password: values.password}, {
            Authorization: `Bearer ${token}`
        })
        try{
            await jwt.verify(data.token, process.env.jwtSecret)
        }catch (e) {setLoading(false);return}
        await sessionStorage.setItem('secret', JSON.stringify( data.token))
        await getSecrets()


        await toggle()
        setLoading(false)
    }

    const getSecrets=async ()=>{
        setLoading(true)
        const tokenS=await JSON.parse(sessionStorage.getItem('secret'))
        const res=await request('/api/secret/get-secret', 'GET', null, {
            Authorization: `Bearer ${tokenS}`
        })
        await setContent(res.data)
        await setData(res.data)
        setLoading(false)
    }

    const newSecret=async (event, values)=>{
        setLoading(true)
        const value={
            category: values.category
            , date: Date.now(),
            lastEdited: Date.now(),
            content: {
                name: values.name
            },
            description: values.description
        }
        const res=await request('/api/secret/save-secret', 'POST', {...value}, {
            Authorization: `Bearer ${tokenS}`
        })
        if(res.status===201){
            toast.success('Secret created')
        }else{
            toast.error(res.message)
        }
        newSecretToggle()
        await getSecrets()


    }

    const filterChange=(e, value, data=null)=>{
        // if(!data){
        //     data=content
        // }
        // let result=[]
        // setFilterMode(value)
        // result=data
        // if(value.category!=='none'){
        //     result=filterCategory(value.category, data)
        // }
        // if(value.type!=='none'){
        //     result=filterType(value.type, result)
        // }
        // if(value.firstNew){
        //     result=result.sort((a,b)=>{return b.date-a.date})
        // }else{
        //     result=result.sort((a,b)=>{return a.date-b.date})
        // }
        // setContent(result)
        // setFilterModal(false)
    }
    const filterCategory=(name, data)=>{
        // let result=[]
        // data.map((i,n)=>{
        //     if(i.category===name){
        //         result.push(i)
        //     }
        // })
        // return  result
    }
    // const filterType=(name, data)=>{
    //     let result=[]
    //     data.map((i, n)=>{
    //         if(i.type===name){
    //             result.push(i)
    //         }
    //     })
    //     return  result
    // }

    const searchResult=(name)=>{
        let filteredArray=[]
        filteredArray=data.filter(a=>{
            return a.content.name.toUpperCase().includes(name.toUpperCase()) || a.description.toUpperCase().includes(name.toUpperCase())
        })
        setContent(filteredArray)

    }

    return (
        <Navbar name='Secrets'>
            <NextSeo
                title={`Tools of Umid | ${
                    router.query.name.substr(0 ,1).toUpperCase()+router.query.name.substr(1)
                }`}
            />
            {loading?<Loader/>:''}
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
                            type="submit" disabled={loading}
                            className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                        >Open secrets</button>
                    </ModalFooter>
                </AvForm>

            </Modal>
            <Modal isOpen={filterModal} toggle={toggleFilter}>
                <ModalHeader>
                    Filter
                </ModalHeader>
                <AvForm onValidSubmit={filterChange}>
                    <ModalBody>

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
            <Modal isOpen={newSecretModal} toggle={newSecretToggle}>
                <ModalHeader>
                    {/*{editItem._id?'Edit link':'Add new link'}*/}
                    Add
                </ModalHeader>
                <AvForm onValidSubmit={newSecret}>
                    <ModalBody>
                        <AvField
                            type='select'
                            name='category'
                            label="Category:"
                            // value={editItem._id?editItem?.category:'loveSecret'}
                            onChange={(e)=>{setSecretMode(e.target.value)}}
                        >
                            <option value="loveSecret">Love secret</option>
                            <option value="criminalSecret">Criminal secret</option>
                            <option value="strangerSecret">Stranger secret</option>
                            <option value="mySecret">My secret</option>
                        </AvField>
                        {secretMode!=='mySecret'?
                        <AvField
                            type='text'
                            name='source' placeholder='Enter a name of source'
                            autoComplete='off'
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a name of source'},
                            }}
                        />:''}

                        {secretMode==='criminalSecret'?<>
                            <AvField
                                type='text'
                                name='owner' placeholder='Enter a full name of secret owner'
                                autoComplete='off'
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                }}
                            />
                            <AvField
                                type='text'
                                name='owner' placeholder='Enter a name of accuser'
                                autoComplete='off'
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of accuser'},
                                }}
                            />
                            </>
                            :''}

                        {secretMode==='strangerSecret'?<>
                                <AvField
                                    type='text'
                                    name='owner' placeholder='Enter a full name of secret owner'
                                    autoComplete='off'
                                    validate={{
                                        required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                    }}
                                />
                                <AvField
                                    type='checkbox'
                                    name='known' label='Does the owner of the secret know you know?'
                                    value={'false'}
                                />
                            </>
                            :''}
                        {secretMode==='loveSecret'?<>
                            <AvField
                                type='text'
                                name='boy' placeholder='Enter a full name of boy'
                                autoComplete='off'
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of boy'},
                                }}
                            />
                                <AvField
                                    type='checkbox'
                                    name='known' label='Does the boy know she loves the he?'
                                    value={'false'}
                                />
                            <AvField
                                type='text'
                                name='girl' placeholder='Enter a full name of girl'
                                autoComplete='off'
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of girl'},
                                }}
                            />
                                <AvField
                                    type='checkbox'
                                    name='known' label='Does the girl know he loves the she?'
                                    value={'false'}
                                />
                            </>
                            :

                        <AvField
                            type='textarea'
                            rows={5}
                            name="description"
                            placeholder="Description"
                            autoComplete='off'
                            // value={editItem?.description}
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a description'},
                                minLength: {value: 5, errorMessage: 'Min length 5 characters'}
                            }}
                        />}


                    </ModalBody>
                    <ModalFooter className='py-2'>
                        <button
                            type='button'
                            onClick={newSecretToggle}
                            className={`btn ${isDarkTheme?'btn-dark border-secondary':'btn-secondary'}`}
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn ${isDarkTheme?'btn-dark border-success':'btn-success'}`}
                        >Add</button>
                    </ModalFooter>
                </AvForm>
            </Modal>



            <div className="container">
                {/*<span className="stamp">Top secret</span>*/}
                <div className="">
                    {!content?
                    <div className=" text-center secret-icon">
                        <div>
                            <img src="/icons/file-icon.png" alt="" className=''/>
                        </div>
                        <div onClick={toggle}>
                            <img src="/icons/lock-icon.png" alt=""/>
                        </div>

                    </div>:
                    <div>
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
                                    onClick={newSecretToggle}

                                >Add link</button>

                            </div>



                        </div>
                        <div className="content link border-top border-primary mt-3">
                            <div className="row ">

                                {content.length!==0?content.map((i,n)=>{


                                        return(
                                            <div key={i._id} className="col-lg-4 col-12 col-sm-6 my-2">
                                                <div className="custom-card hover" >
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
                                                                    // setEditItem(i);
                                                                    newSecretToggle();
                                                                    event.stopPropagation()}}
                                                            >Edit</DropdownItem>
                                                            <DropdownItem
                                                                size='sm'
                                                                className={`text-info w-100`}
                                                                onClick={(event)=>{
                                                                    // setViewLink(i);
                                                                    // toggleView();
                                                                    event.stopPropagation()}}
                                                            >View</DropdownItem>
                                                            <DropdownItem
                                                                size='sm'
                                                                className={`text-danger w-100`}
                                                                onClick={(event)=>{
                                                                    // setDeleteItem(i);
                                                                    // toggleDelete();
                                                                    event.stopPropagation()}}
                                                            >Delete</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    {i.description}
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

                    }
                </div>


            </div>
        </Navbar>

    );
};

export default Secrets;