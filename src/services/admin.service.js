/* eslint-disable prettier/prettier */
import api from './api'
import AuthService from './auth.service'
import TokenService from './token.service'


const updateAdminInfo = async (_id,email,firstName,lastName,orgName,BOD,phoneNo,address) => {
    return await api
    .patch(`/api/admin/${_id}`, {
        email,
        firstName,
        lastName,
        orgName,
        BOD,
        phoneNo,
        address,
    })
    .then((response)=>{
        // console.log(response.data.data)
        if (response.status === 200) {
            TokenService.updateUserInfo(response.data.data)
            return response.data
        }
        return response
    })
}

const updateAdminProfileImg = async (_id,profileImg) => {
    return await api
    .patch(`/api/admin/ProfileImg/${_id}`,{
        profileImg
    })
    .then((response)=>{
        if (response.status === 200) {
            TokenService.updateUserInfo(response.data.data)
            return response.data
        }
        return response
    })
}

const UpdateAdminPassword = async (_id, password, newPassword) => {
    return await api
    .patch(`/api/admin/Password/${_id}`,{
        password,
        newPassword
    })
    .then((response)=>{
        if (response.status === 200) {
            TokenService.updateUserInfo(response.data.data)
            return response.data
        }
        return response
    })
}

const deleteAdminAccount = async (_id) => {
    return await api
    .delete(`/api/admin/${_id}`)
    .then((response)=>{
        if (response.status === 200) {
            return response.data
        }
        return response
    })
}

const AdminService = {
    updateAdminInfo,
    updateAdminProfileImg,
    UpdateAdminPassword,
    deleteAdminAccount
}

export default AdminService