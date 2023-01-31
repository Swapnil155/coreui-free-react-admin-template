/* eslint-disable prettier/prettier */
import { CCol, CRow, CCard, CCardHeader, CCardBody, CAvatar, CForm, CFormLabel, CFormInput, CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminService from 'src/services/admin.service'
import AuthService from 'src/services/auth.service'
import TokenService from 'src/services/token.service'
// import AdminService from '../../../services/admin.service'

const initialState = {
    _id : '',
    firstName : '',
    lastName : '',
    orgName : '',
    address : '',
    email : '',
    phoneNo : '',
    BOD : ''
}

export default function Profile() {
    const navigate =  useNavigate()
    const [accountInfo, setAccountInfo] = useState(initialState)
    
    
    // console.log(user.name ? user.name.firstName : 'done')
    
    useEffect(() => {
        // console.log(user)
        const user = TokenService.getUser().userData
        setAccountInfo({
            _id : user._id,
            firstName : user.name ? user.name.firstName : '',
            lastName : user.name ? user.name.lastName : '',
            orgName : user.orgName,
            address : user.address ? user.address : '',
            email : user.email,
            phoneNo : user.phoneNo ? user.phoneNo : '',
            BOD : user.BOD ? user.BOD : ''
        })
    },[])
    // console.log(accountInfo)
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log(accountInfo)
        const firstName = accountInfo.firstName
        const lastName = accountInfo.lastName
        const orgName = accountInfo.orgName
        const address = accountInfo.address
        const email = accountInfo.email
        const phoneNo = accountInfo.phoneNo
        const BOD = accountInfo.BOD
        const _id = accountInfo._id
        try {
            await AdminService.updateAdminInfo(_id,email,firstName,lastName,orgName,BOD,phoneNo,address)
            .then((res) => {
                console.log(res)
                if (res.status === 400 ){
                  window.alert(res.data.Error[0].message)
                  // window.location.reload()
                }
                if (res.status === 401) {
                    window.alert(res.data.Error[0].message)
                    navigate('/login')
                    AuthService.logout()
                }
               
                if (res.status === 200) {
                  window.alert(`Updateation Successfully completed`)
                  
                } 
              })
        } catch (error) {
           const err = error.response
            // console.log(error)
            if(error.status === 401 || error.status === 403){
               navigate('/login')
            }

        }
    }

    const onChangeHandler = (e) => {
        setAccountInfo({
            ...accountInfo,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value,
        })
    }
    const accountDetails = () =>{

        return (
            <CForm 
                className='row g-3'
                onSubmit={onSubmitHandler}
            >
                <CCol md={6}>
                    <CFormLabel htmlFor='firstName'>First name</CFormLabel>
                    <CFormInput 
                        type='text' 
                        id='fistName'
                        name='firstName'
                        defaultValue={accountInfo.firstName }
                        onChange={onChangeHandler}
                        placeholder='Enter your fisrt name'
                        required
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor='lastName'>Last Name</CFormLabel>
                    <CFormInput
                        type='text'
                        id='lastName'
                        name='lastName'
                        defaultValue={accountInfo.lastName}
                        onChange={onChangeHandler}
                        placeholder='Enter your last name'
                        required
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor='organization'>Organization Name</CFormLabel>
                    <CFormInput
                        type='text'
                        id='organization'
                        name='orgName'
                        defaultValue={accountInfo.orgName}
                        onChange={onChangeHandler}
                        placeholder='Enter your organization name'
                        required
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor='location'>location</CFormLabel>
                    <CFormInput
                        type='text'
                        id='location'
                        name='address'
                        defaultValue={accountInfo.address}
                        onChange={onChangeHandler}
                        placeholder='Enter your location'
                        required
                    />
                </CCol>
                <CCol md={12}>
                    <CFormLabel htmlFor='email'>Email</CFormLabel>
                    <CFormInput 
                        type='text'
                        id='email'
                        name='email'
                        defaultValue={accountInfo.email}
                        onChange={onChangeHandler}
                        placeholder='Enter organization mail address'
                        required
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor='phoneNo'>Phone No.</CFormLabel>
                    <CFormInput
                        type='text'
                        id='phoneNo'
                        name='phoneNo'
                        defaultValue={accountInfo.phoneNo}
                        onChange={onChangeHandler}
                        placeholder='Enter your phone No'
                        required
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor='BOD'>Birth Date</CFormLabel>
                    <CFormInput
                        type='text'
                        id='BOD'
                        name='BOD'
                        defaultValue={accountInfo.BOD}
                        onChange={onChangeHandler}
                        placeholder='Enter your birth date'
                        required
                    />
                </CCol>
                <div className='mb-3'>
                <CButton type='submit' color='primary'>Save Changes</CButton>
                </div>
            </CForm>
        )
    }
    
    const profileImage = () =>{
        return (
            <>
            <CAvatar src="" color="secondary" style={{'width': '10rem','height' : '10rem'}}></CAvatar>
            <div className='mt-2'><small>JPG or PNG no longer 5 MB </small></div>
            <div className='mt-2'><CButton>Upload new image</CButton></div>
            </>
        )
    }

  return (
    <CRow>
        <CCol xs={3}>
            <CCard className="mb-4">
                <CCardHeader>
                <strong>Profile Image</strong>
                </CCardHeader>
                <CCardBody className='text-center'>
                {profileImage()}
                </CCardBody>
            </CCard>
        </CCol>
        <CCol xs={9}>
            <CCard className="mb-4">
                <CCardHeader>
                <strong>Account Details</strong>
                </CCardHeader>
                <CCardBody>
                {accountDetails()}
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  )
}
