/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from 'src/services/auth.service'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const initialstate = {
  email : '',
  password : ''
} 

const Login = () => {
  const navigate = useNavigate()
  const [loginCredential, setLoginCredential] = useState(initialstate)

  const changeHandler = (e) =>{
    setLoginCredential({...loginCredential,
    [e.target.name]: e.target.value,
    [e.target.name]: e.target.value})
  }

  const onSubmitHandler = async (e) => {
  
    console.log(loginCredential)
    e.preventDefault();
    try {
        await AuthService.login(loginCredential.email, loginCredential.password).then(
        (res) => {
          console.log(res)
          if (res.status === 400 || res.status === 401){
            window.alert(res.data.Error[0].message)
            // window.location.reload()
          }
          if (res.status === 200) {
            navigate("/dashboard")
            window.alert(`Welcome Back`)
            window.location.reload()
          } 
        });

    } catch (error) {
      const err = error.response
      console.log(err)
      if(err.status === 401 || err.status === 400){
         window.alert(err.data.Error[0].message)
      }

    }
  }
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Username" 
                        autoComplete="username" 
                        name='email' 
                        onChange={changeHandler} 
                        defaultValue={loginCredential.email}
                        required 
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name='password'
                        onChange={changeHandler}
                        defaultValue={loginCredential.password}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
