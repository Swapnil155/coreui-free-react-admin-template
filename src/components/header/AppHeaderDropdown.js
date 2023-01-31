/* eslint-disable prettier/prettier */

import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilCreditCard,
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import AuthService from 'src/services/auth.service'
import { Link, useNavigate } from 'react-router-dom'


const AppHeaderDropdown = () => {
  const linkCss = {
    textDecoration : 'none',
    cursor : 'pointer'
  }
  const navigate = useNavigate()

  const logout = () => {
    AuthService.logout()
    navigate("/login")
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        {/* <Link to={'/Account/Profile'} style={linkCss}> */}
        <CDropdownItem href='/Account/Profile'>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        {/* </Link> */}

        {/* <Link to={"/Account/Security"} style={linkCss}> */}
        <CDropdownItem href='/Account/Security'>
          <CIcon icon={cilSettings} className="me-2" />
          Security
        </CDropdownItem>
        {/* </Link> */}

        {/* <Link to='/Account/Payment' style={linkCss}> */}
        <CDropdownItem href='/Account/Payment'>
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        {/* </Link> */}

        <CDropdownDivider />
        <CDropdownItem style={{'cursor': 'pointer'}} onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2"  />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
