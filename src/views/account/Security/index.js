/* eslint-disable prettier/prettier */
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminService from 'src/services/admin.service'
import AuthService from 'src/services/auth.service'
import TokenService from 'src/services/token.service'


const initialstate = {
  _id : '',
  currentPassword : '',
  newPassword : '',
  confirmPassword : '',
}

export default function Security() {
  const navigate =  useNavigate()
  const [accountinfo,setAccountInfo] = useState(initialstate)
  
  useEffect(()=>{
    const user = TokenService.getUser().userData
    // console.log(user)
    setAccountInfo({
      _id : user._id,
      currentPassword : user.password,
      newPassword : '',
      confirmPassword : ''
    })
  },[])
  
  const onChangleHandler = (e) =>{
    setAccountInfo({
      ...accountinfo,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    })
  }

  // console.log(accountinfo)
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    // console.log(accountinfo)
    const _id = accountinfo._id
    const password = accountinfo.currentPassword
    const newPassword =  accountinfo.newPassword
    const confirmPassword = accountinfo.confirmPassword

    if (newPassword === confirmPassword) {
      try {
        await AdminService.UpdateAdminPassword(_id,password,newPassword)
        .then((res)=>{
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
            window.location.reload()
          } 
        },(err)=>{
          const error = err.response
        console.log(err)
        if(error.status === 400){
          window.alert(error.data.Error[0].message)
        }
        })
      } catch (error) {
        const err = error.response
        console.log(err)
        
      }
    } else {
      window.alert('new password and confirm password are not match')
    }

    
  }

  const changePasswordFrom =  () =>{
  
    return (
      <CForm className='row g-3' onSubmit={onSubmitHandler}>
        <CCol sm={12}>
          <CFormLabel htmlFor='currentPassword'>Current password</CFormLabel>
          <CFormInput 
            type='password'
            id='currentPassword'
            name='currentPassword'
            placeholder='Enter current password'
            onChange={onChangleHandler}
            required
          />
        </CCol>
        <CCol sm={12}>
          <CFormLabel htmlFor='newPassword'>New password</CFormLabel>
          <CFormInput 
            type='password'
            id='newPassword'
            name='newPassword'
            placeholder='Enter new password'
            onChange={onChangleHandler}
            required
          />
        </CCol>
        <CCol sm={12}>
          <CFormLabel htmlFor='rePassword'>Confirm password</CFormLabel>
          <CFormInput 
            type='password'
            id='rePassword'
            name='confirmPassword'
            placeholder='confirm new password'
            onChange={onChangleHandler}
            required
          />
        </CCol>
        <div className='mb-3'>
          <CButton type='submit' color='primary'>Save Changes</CButton>
        </div>
      </CForm>
    )
  }

  const deleteMyAccount = async () =>{
    if(window.confirm(`arue you sure about it`) === true){
      try {
        const _id = accountinfo._id
        await AdminService.deleteAdminAccount(_id)
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
              navigate('/Register')
              AuthService.logout()
            } 
          })
    } catch (error) {
        const err = error.response
        console.log(err)
        if(error.status === 401 || error.status === 403){
           navigate('/Register')
        }
  
    }
    }

   
  }

  return (
    <CContainer>
    <CRow>
      <CCol xs={8}>
        <CCard>
        <CCardHeader>
          <strong>Change Password</strong>
        </CCardHeader>
        <CCardBody>
          {changePasswordFrom()}
        </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={4}>
        <CCard>
          <CCardHeader>
            <strong>Delete my account</strong>
          </CCardHeader>
          <CCardBody>
            <p>Deleting your account is a permanent action and cannot be undone. If you are sure you want to delete your account, select the button below.</p>
            <div className='mt-3'>
              <CButton onClick={()=>deleteMyAccount()} color='danger' variant="outline">I understand, Delete my account</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
    </CContainer>
  )
}
