/* eslint-disable prettier/prettier */
import api from './api'
import TokenService from './token.service'

const singUp  = async (email,password, orgName) => {
    return api
    .post("/api/admin/signUp", {
        email,
        password,
        orgName
    }).then((response) => {
        console.log(response)
        if (response.data.accessToken){
            TokenService.setUser(response.data)
        }
        return response
    })
}

const login = (email,password) => {

    return api
    .post("/api/admin/login",{
        email,
        password
    })
    .then((response) =>{
            if(response.data.accessToken){
                // TokenService.setUser(response.data)
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response
        
    })
}

const logout = () => {
    TokenService.removeUser()
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const AuthService = {
    singUp,
    login,
    getCurrentUser,
    logout
}

export default AuthService