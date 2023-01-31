/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from 'src/services/auth.service'

const initialState = {
  orgName : '',
  email : '',
  password : '',
  rePassword : ''

}
const Register = () => {

  const navigate =  useNavigate()
  const [registrationCredenitals , setRegistrationCredentials] = useState (initialState)

  const onChangeHandler = (e) => {
    setRegistrationCredentials({
      ...registrationCredenitals,
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
    })
  }
  const email = registrationCredenitals.email
    const orgName = registrationCredenitals.orgName
    const password = registrationCredenitals.password
    const rePassword = registrationCredenitals.rePassword
  const onSubmitHandle = async (e) =>{
    e.preventDefault()
    

    if (password === rePassword) {
      try {
        await AuthService.singUp(email,password,orgName)
        .then((res) => {
          // console.log(res.status)
          if (res.status === 400 || res.status === 401){
            window.alert(res.data.Error[0].message)
            // window.location.reload()
          }
          if (res.status === 200) {
            navigate("/dashboard");
            window.alert(`Registartion Successfully completed`)
            window.location.reload()
          } 
        },(error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    }else {
      window.alert('Password miss match with Re-password')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmitHandle}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name='orgName'
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Organization-Name"
                      autoComplete="Organization-Name"
                      defaultValue={orgName}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      name='email'
                      onChange={onChangeHandler}
                      placeholder="Bussiness mail address"  
                      autoComplete="email"
                      defaultValue={email} 
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='password'
                      onChange={onChangeHandler}
                      type="password"
                      placeholder="Password"
                      defaultValue={password}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='rePassword'
                      onChange={onChangeHandler}
                      type="password"
                      placeholder="Repeat password"
                      defaultValue={rePassword}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type='submit' color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
