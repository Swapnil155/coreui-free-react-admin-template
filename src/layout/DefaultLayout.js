/* eslint-disable prettier/prettier */

import React, { useEffect,useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }else {
      navigate("/login")
    }
  }, []);
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {currentUser && (
            <AppContent />
          )}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
