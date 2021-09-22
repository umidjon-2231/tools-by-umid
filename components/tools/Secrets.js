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
import Title from "../Title";

const Secrets = () => {
    const [data, setData]=useState([])
    const [content, setContent]=useState(null)
    const [editItem, setEditItem]=useState({})
    const [deleteItem, setDeleteItem]=useState({})
    const [viewItem, setViewItem]=useState({})

    const [checkModal, setCheckModal]=useState(false)
    const [newSecretModal, setNewSecretModal]=useState(false)
    const [filterModal, setFilterModal]=useState(false)
    const [deleteModal, setDeleteModal]=useState(false)
    const [viewModal, setViewModal]=useState(false)

    const [loading, setLoading]=useState(true)
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
        setNewSecretModal(!newSecretModal)
        if(newSecretModal){
            setSecretMode('loveSecret')
            setEditItem({})
        }
    }
    const toggleDelete=()=>{
        setDeleteModal(!deleteModal)
        if(deleteModal){
            setDeleteItem({})
        }
    }
    const toggleView = () => {
        setViewModal(!viewModal)
        if(viewModal){
            setViewItem({})
        }
    }
    const toggleFilter=()=>{
        setFilterModal(!filterModal)
    }

    useEffect(async ()=>{

        const tokenSecret=await JSON.parse(sessionStorage.getItem('secret'))
        try {
            await jwt.verify(tokenSecret, process.env.jwtSecret)
        }catch (e) {
            return setLoading(false)
        }
        setTokenS(tokenS)
        await getSecrets()
        setTokenS(tokenSecret)
        // const items=document.querySelectorAll('.secret-item')
        // for(const item of items){
        //     console.log(item.clientHeight)
        // }


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
        setTokenS(data.token)


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
        const value=valueParser(values)

        if(editItem._id){
            const res=await request('/api/secret/edit-secret', 'PUT', {...value, _id: editItem._id}, {
                Authorization: `Bearer ${tokenS}`
            })
            if(res.status===200){
                toast.success('Secret edited')
            }
        }else{
            const res=await request('/api/secret/save-secret', 'POST', {...value}, {
                Authorization: `Bearer ${tokenS}`
            })
            if(res.status===201){
                toast.success('Secret created')
            }
        }


        newSecretToggle()
        await getSecrets()


    }
    const valueParser=(values)=>{

        let newValue={
            category: values.category,
            content: {}
        }
        if(editItem._id){
            newValue.date=editItem.date
        }else{
            newValue.date=Date.now()
        }

        switch (values.category){
            case "loveSecret":{
                newValue.content.boy=values.boy
                newValue.content.girl=values.girl
                newValue.content.boyLove=values.boyLove
                newValue.content.girlLove=values.girlLove
                break
            }
            case "criminalSecret":{
                newValue.content.owner=values.owner
                newValue.content.accuser=values.accuser
                break
            }
            case "strangerSecret":{
                newValue.content.owner=values.owner
                newValue.content.known=values.known
                break
            }
            case "mySecret":{
                if(!values.whoKnow.search(/Nobody/i)){
                    newValue.content.whoKnow=null
                }else{
                    values.whoKnow=values.whoKnow.replace(/\n/g, ' ')
                    let whoKnow=values.whoKnow.split(', ')

                    let filteredArr=[]
                    whoKnow.map((i)=>{

                       filteredArr.push(filterSpaceOfString(i))

                    })
                    newValue.content.whoKnow=filteredArr
                }
                break
            }
        }
        if(!!values.source){
            newValue.content.source=values.source
        }
        if(!!values.description){
            newValue.content.description=values.description.replace(/\n/g, ' ')
        }



        console.log(newValue)
        return newValue
    }

    const deleteLink=async ()=>{
        setLoading(true)
        const res=await request('/api/secret/delete-secret', 'DELETE', {_id: deleteItem._id}, {
            Authorization: `Bearer ${tokenS}`
        })
        if(res.status===200){
            toast.error('Secret deleted')
        }
        await getSecrets()
        toggleDelete()
    }

    const filterChange=(e, value, data=null)=>{
        if(!data){
            data=content
        }
        let result=[]
        setFilterMode(value)
        result=data
        if(value.category!=='none'){
            let resultFilter=[]
            data.map((i)=>{
                if(i.category===name){
                    resultFilter.push(i)
                }
            })
            result=resultFilter
        }
        if(value.firstNew){
            result=result.sort((a,b)=>{return b.date-a.date})
        }else{
            result=result.sort((a,b)=>{return a.date-b.date})
        }
        setContent(result)
        setFilterModal(false)
    }

    const searchResult=(name)=>{
        name=filterSpaceOfString(name)
        let filteredArray=[]
        let reg=new RegExp(name, 'i')
        filteredArray=data.filter(a=>{
            if(a.category==='loveSecret'){
                return a.content.boy.search(reg)!==-1 || a.content.girl.search(reg)!==-1
            }else if(a.category==='strangerSecret'){
                return a.content.owner.search(reg)!==-1 || a.content.description.search(reg)!==-1 || a.content.source.search(reg)!==-1
            }else if(a.category==='criminalSecret'){
                return a.content.owner.search(reg)!==-1 || a.content.description.search(reg)!==-1 || a.content.source.search(reg)!==-1 ||
                    a.content.accuser.search(reg)!==-1
            }else if(a.category==='mySecret'){
                if(a.content.description.search(reg)!==-1){
                    return true
                }
                let check=a.content.whoKnow.toString()
                return check.search(reg)!==-1
            }

        })

        setContent(filteredArray)

    }

    const filterSpaceOfString=(text)=>{
        let newTxt=''
        for(let txt=0; txt<text.length; txt++){
            if(txt===0 && text[txt]!==' '){
                newTxt+=text[txt]
            }
            if(txt===text.length-1 && text[txt]!==' ' && txt!==0){
                newTxt+=text[txt]
            }
            if(txt!==0 && txt!==text.length-1 && (text[txt]!==' ' || text[txt+1]!==' ')){
                newTxt+=text[txt]
            }
        }
        return newTxt
    }

    return (
        <Navbar name='Secrets'>
           <Title />
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
                    {editItem._id?'Edit secret':'Add new secret'}
                </ModalHeader>
                <AvForm onValidSubmit={newSecret}>
                    <ModalBody>
                        <AvField
                            type='select'
                            name='category'
                            label="Category:"
                            value={editItem._id?editItem?.category:secretMode}
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
                            value={editItem.content?.source}
                            validate={{
                                required: {value: true, errorMessage: 'Please enter a name of source'},
                            }}
                        />:
                            <AvField
                                type='textarea'
                                rows={4}
                                name="whoKnow"
                                placeholder="Who know?(Example: Name1, Name2, ...) or Nobody"
                                label='Who know:'
                                autoComplete='off'
                                value={editItem._id?editItem.content.whoKnow?editItem.content.whoKnow.join(', '):'Nobody':''}
                            />

                        }

                        {secretMode==='criminalSecret'?<>
                            <AvField
                                type='text'
                                name='owner' placeholder='Enter a full name of secret owner'
                                autoComplete='off'
                                value={editItem.content?.owner}
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                }}
                            />
                            <AvField
                                type='text'
                                name='accuser' placeholder='Enter a name of accuser'
                                autoComplete='off'
                                value={editItem.content?.accuser}
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
                                    value={editItem.content?.owner}
                                    validate={{
                                        required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                    }}
                                />
                                <AvField
                                    type='checkbox'
                                    value={editItem.content?.known}
                                    name='known' label='Does owner know that you know his(her) secret?'
                                />
                            </>
                            :''}
                        {secretMode==='loveSecret'?<>
                            <AvField
                                type='text'
                                name='boy' placeholder='Enter a full name of boy'
                                autoComplete='off'
                                value={editItem.content?.boy}
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of boy'},
                                }}
                            />
                                <AvField
                                    type='checkbox'
                                    name='boyLove' label='Does the boy loves she?'
                                    value={editItem.content?.boyLove}
                                />
                            <AvField
                                type='text'
                                name='girl' placeholder='Enter a full name of girl'
                                autoComplete='off'
                                value={editItem.content?.girl}
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a full name of girl'},
                                }}
                            />
                                <AvField
                                    type='checkbox'
                                    value={editItem.content?.girlLove}
                                    name='girlLove' label='Does the girl loves he?'

                                />
                            </>
                            :

                        <AvField
                            type='textarea'
                            rows={5}
                            name="description"
                            placeholder="Description"
                            label='Description:'
                            autoComplete='off'
                            value={editItem.content?.description}
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
                        >{editItem._id?'Edit':'Add'}</button>
                    </ModalFooter>
                </AvForm>
            </Modal>
            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader>
                    Delete secret
                </ModalHeader>
                <ModalBody>
                    Do you want to delete this secret?(Click to card for view info of secret)
                    <div className="col-12 content my-3">
                        <div className="custom-card" onClick={()=>{setViewModal(deleteItem);toggleView()}}>
                            {deleteItem.category!=='loveSecret'?<p className='my-1'>{deleteItem.content?.description}</p>:''}
                            {(()=>{
                                switch (deleteItem.category){
                                    case 'loveSecret' :{
                                        return <div>
                                            {deleteItem.content.boy} <b style={{color: 'red'}}>&hearts;</b> {deleteItem.content.girl}
                                        </div>
                                    }
                                    case 'strangerSecret': {
                                        return <div>
                                            <b>Owner: </b><b style={{
                                            fontWeight: 'normal',
                                            color: deleteItem.content.known?'var(--success)':'var(--danger)'
                                        }}>{deleteItem.content.owner}</b>
                                            <br/>
                                            <b>Source: </b><b style={{
                                            fontWeight: 'normal',
                                            color: 'var(--info)'
                                        }}>{deleteItem.content.source}</b>

                                        </div>
                                    }
                                    case 'criminalSecret': {
                                        return <div>
                                            <b>Owner: </b><b style={{
                                            fontWeight: 'normal',
                                            color: 'var(--warning)'
                                        }}>{deleteItem.content.owner}</b>
                                            <br/>
                                            <b>Source: </b><b style={{
                                            fontWeight: 'normal',
                                            color: 'var(--info)'
                                        }}>{deleteItem.content.source}</b>
                                            <br/>
                                            <b>Accuser: </b><b style={{
                                            fontWeight: 'normal',
                                            color: 'var(--danger)'
                                        }}>{deleteItem.content.accuser}</b>
                                        </div>
                                    }
                                }
                            })()}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='py-2 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={toggleDelete}>Cancel</button>
                    <button className="btn btn-danger" onClick={deleteLink}>Delete</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={viewModal} toggle={toggleView}   >
                <ModalHeader>Vew secret</ModalHeader>
                <ModalBody>
                    <AvForm >
                            <AvField
                                type='select'
                                name='category'
                                label="Category:"
                                disabled={true}
                                value={viewItem?.category}
                            >
                                <option value="loveSecret">Love secret</option>
                                <option value="criminalSecret">Criminal secret</option>
                                <option value="strangerSecret">Stranger secret</option>
                                <option value="mySecret">My secret</option>
                            </AvField>

                            {viewItem.category!=='mySecret'?
                                <AvField
                                    type='text'
                                    name='source' placeholder='Enter a name of source'
                                    autoComplete='off'
                                    value={viewItem.content?.source}
                                    label={'Source: '}
                                    disabled={true}
                                    validate={{
                                        required: {value: true, errorMessage: 'Please enter a name of source'},
                                    }}
                                />:
                                <AvField
                                    type='textarea'
                                    rows={4}
                                    name="whoKnow"
                                    placeholder="Who know?(Example: Name1, Name2, ...) or Nobody"
                                    disabled={true}
                                    label='Who know:'
                                    autoComplete='off'
                                    value={viewItem._id?viewItem.content.whoKnow?viewItem.content.whoKnow.join(', '):'Nobody':''}
                                />

                            }

                            {viewItem.category==='criminalSecret'?<>
                                    <AvField
                                        type='text'
                                        name='owner' placeholder='Enter a full name of secret owner'
                                        autoComplete='off'
                                        value={viewItem.content?.owner}
                                        label={'Owner: '}
                                        disabled={true}
                                        validate={{
                                            required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                        }}
                                    />
                                    <AvField
                                        type='text'
                                        name='accuser' placeholder='Enter a name of accuser'
                                        autoComplete='off'
                                        value={viewItem.content?.accuser}
                                        label={'Accuser:'}
                                        disabled={true}
                                        validate={{
                                            required: {value: true, errorMessage: 'Please enter a full name of accuser'},
                                        }}
                                    />
                                </>
                                :''}

                            {viewItem.category==='strangerSecret'?<>
                                    <AvField
                                        type='text'
                                        name='owner' placeholder='Enter a full name of secret owner'
                                        autoComplete='off'
                                        value={viewItem.content?.owner}
                                        label={'Owner: '}
                                        disabled={true}
                                        validate={{
                                            required: {value: true, errorMessage: 'Please enter a full name of secret owner'},
                                        }}
                                    />
                                    <AvField
                                        type='checkbox'
                                        value={viewItem.content?.known}
                                        disabled={true}
                                        name='known' label='Does owner know that you know his(her) secret?'
                                    />
                                </>
                                :''}
                            {viewItem.category==='loveSecret'?<>
                                    <AvField
                                        type='text'
                                        name='boy' placeholder='Enter a full name of boy'
                                        autoComplete='off'
                                        value={viewItem.content?.boy}
                                        label={'Name of boy: '}
                                        disabled={true}
                                        validate={{
                                            required: {value: true, errorMessage: 'Please enter a full name of boy'},
                                        }}
                                    />
                                    <AvField
                                        type='checkbox'
                                        name='boyLove' label='Does the boy loves she?'
                                        disabled={true}
                                        value={viewItem.content?.boyLove}
                                    />
                                    <AvField
                                        type='text'
                                        name='girl' placeholder='Enter a full name of girl'
                                        autoComplete='off'
                                        value={viewItem.content?.girl}
                                        label='Name of girl:'
                                        disabled={true}
                                        validate={{
                                            required: {value: true, errorMessage: 'Please enter a full name of girl'},
                                        }}
                                    />
                                    <AvField
                                        type='checkbox'
                                        value={viewItem.content?.girlLove}
                                        disabled={true}
                                        name='girlLove' label='Does the girl loves he?'

                                    />
                                </>
                                :

                                <AvField
                                    type='textarea'
                                    rows={5}
                                    name="description"
                                    placeholder="Description"
                                    label='Description:'
                                    autoComplete='off'
                                    value={viewItem.content?.description}
                                    disabled={true}
                                    validate={{
                                        required: {value: true, errorMessage: 'Please enter a description'},
                                        minLength: {value: 5, errorMessage: 'Min length 5 characters'}
                                    }}
                                />}
                    </AvForm>
                </ModalBody>
                <ModalFooter className='py-2'>
                    <button
                        type='button'
                        className={`btn w-100 ${isDarkTheme?'btn-dark border-info':'btn-info'}`}
                        onClick={toggleView}
                    >Ok</button>
                </ModalFooter>
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
                        <div className="row  align-items-center" style={{paddingLeft: 10, paddingRight: 10}}>

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

                                >Add secret</button>

                            </div>



                        </div>
                        <div className="content link border-top border-primary mt-3">
                            <div className="row" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start'}}>

                                {content.length!==0?content.map((i,n)=>{

                                    return(
                                        <div key={i._id} className="col-lg-4 col-12 col-sm-6 my-2 secret-item">
                                            <div className="custom-card hover" onClick={
                                                ()=>{setViewItem(i);toggleView()}
                                            }>
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
                                                                setSecretMode(i.category)
                                                                newSecretToggle();
                                                                event.stopPropagation()}}
                                                        >Edit</DropdownItem>
                                                        <DropdownItem
                                                            size='sm'
                                                            className={`text-info w-100`}
                                                            onClick={(event)=>{
                                                                setViewItem(i);
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
                                                <div className="body-link">
                                                    <h4 style={{fontSize: '1rem'}}>
                                                        {(()=>{
                                                            switch (i.category){
                                                                case'loveSecret':{
                                                                    return 'Love secret'
                                                                }
                                                                case'strangerSecret': {
                                                                    return 'Stranger secret'
                                                                }
                                                                case'mySecret': {
                                                                    return 'My secret'
                                                                }
                                                                case'criminalSecret': {
                                                                    return 'Criminal secret'
                                                                }
                                                            }
                                                        })()}

                                                    </h4>

                                                    {i.category!=='loveSecret'?<p className='my-1'>{i.content?.description}</p>:''}
                                                    {
                                                        (()=>{
                                                            switch (i.category){
                                                                case'loveSecret':{
                                                                    return <div>
                                                                        {i.content.boy} <b style={{color: 'red'}}>&hearts;</b> {i.content.girl}
                                                                    </div>
                                                                }
                                                                case 'strangerSecret': {
                                                                    return <div>
                                                                        <b>Owner: </b><b style={{
                                                                            fontWeight: 'normal',
                                                                        color: i.content.known?'var(--success)':'var(--danger)'
                                                                        }}>{i.content.owner}</b>
                                                                        <br/>
                                                                        <b>Source: </b><b style={{
                                                                        fontWeight: 'normal',
                                                                        color: 'var(--info)'
                                                                    }}>{i.content.source}</b>

                                                                    </div>
                                                                }
                                                                case'criminalSecret': {
                                                                    return <div>
                                                                        <b>Owner: </b><b style={{
                                                                        fontWeight: 'normal',
                                                                        color: 'var(--warning)'
                                                                    }}>{i.content.owner}</b>
                                                                        <br/>
                                                                        <b>Source: </b><b style={{
                                                                        fontWeight: 'normal',
                                                                        color: 'var(--info)'
                                                                    }}>{i.content.source}</b>
                                                                        <br/>
                                                                        <b>Accuser: </b><b style={{
                                                                        fontWeight: 'normal',
                                                                        color: 'var(--danger)'
                                                                    }}>{i.content.accuser}</b>
                                                                    </div>
                                                                }
                                                            }
                                                        })()
                                                    }

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

                    }
                </div>


            </div>
        </Navbar>

    );
};

export default Secrets;
