/* eslint-disable prettier/prettier */
import AuthService from './auth.service'
import api from './api'
import TokenService from './token.service'

const createPackage = async (data) => {
 
  const author = AuthService.getCurrentUser().userData
  console.log(author)

  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  const multipleImage = data.galleryImage
  const formData = new FormData()
  formData.append('tourName', data.tourName)
  formData.append('aboutTour', data.aboutTour)
  formData.append('startDate', data.startDate)
  formData.append('endDate', data.endDate)
  formData.append('city', data.city)
  formData.append('state', data.state)
  formData.append('pincode', data.pincode)
  formData.append('highlights', data.highlights)
  formData.append('hostSay', data.hostSay)
  formData.append('coverImg', data.coverImg)
  for (let i = 0; i < multipleImage.length; i++) {
    formData.append('galleryImage', multipleImage[i])
  }
  formData.append('admin_id', author.admin_id)
  formData.append('orgName', author.orgName)
  formData.append('profileImage', author.profileImg ? author.profileImg : 'Profile')

  formData.append('publish_date', today.toUTCString())
  formData.append('totalSeats', data.totalSeats)
  formData.append('price',data.price)
  formData.append('Tour_id', new Date().getTime().toString())

  //   for (let key of formData.keys()) {
  //     console.log(key, formData.get(key))
  //   }

  //   function convertFormdata2JSON(formData) {
  //     let obj = []
  //     for (let key of formData.keys()) {
  //       obj[key] = formData.get(key)
  //     }
  //     return obj
  //   }

  //   const jsonData = await convertFormdata2JSON(formData)

  //   console.log(jsonData)
  return await api.post(`/api/package/${author._id}/Admin`, formData).then((response) => {
    if (response.status === 200) {
      return response.data
    }
    return response
  })
}

const UpdatePackage = async (data) => {

  const author = AuthService.getCurrentUser().userData

  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  console.log(data)
  const _id = data._id
  console.log(_id)

  const packageInfo = {
    tourName : data.tourName,
    aboutTour : data.aboutTour,
    startDate : data.startDate,
    endDate : data.endDate,
    city : data.city,
    state : data.state,
    pincode : data.pincode,
    highlights : data.highlights,
    hostSay :  data.hostSay,
    modified_date : today.toUTCString(),
    totalSeats : data.totalSeats,
    price : data.price,
    admin_id : author.admin_id,
    orgName : author.orgName,
    profileImage : author.profileImg ? author.profileImg : 'Profile',

  }
  console.log(packageInfo)

  return await api.patch(`/api/package/${_id}/Details`, packageInfo).then((response) => {
    if (response.status === 200) {
      return response.data
    }
    return response
  })
}

const allPackage =  async () => {
    const user = TokenService.getUser().userData
    console.log(user._id)
    return await api.get(`/api/package/${user._id}/Admin`)
}

const getPackageById = async (_id) => {
    return await api.get(`/api/package/${_id}`)
    .then((res)=>{
        return res.data
    },(err)=>{
        console.log(err)
    })
}

const updateImage = async (data) => {
  const _id = data._id
  console.log(_id)
  const multipleImage = data.galleryImage

  const formDataImage = new FormData()
  formDataImage.append('coverImg', data.coverImg)
  for (let i = 0; i < multipleImage.length; i++) {
    formDataImage.append('galleryImage', multipleImage[i])
  }

  // for (let key of formDataImage.keys()) {
  //       console.log(key, formDataImage.get(key))
  //     }

  // return await api.patch(`/api/package/image/${_id}`,formDataImage).then((res)=>{
    return await api.patch(`/api/package/${_id}/Images`,formDataImage).then((res)=>{
      if (res.status === 200) {
        return res.data
      }
      return res
    },(err)=>{
      console.log(err)
    })
}

const setVisibility = async (id,value) => {
    return api.patch(`/api/package/${id}/Tour-Visibility`,{Status : value}).then((res)=>{
      if (res.status === 200) {
        return res.data
      }
      return res.data
    })
}

const setBookingStatus = async (id,value) => {
  return api.patch(`/api/package/${id}/Booking-Status`,{Status : value}).then((res)=>{
    if (res.status === 200) {
      return res.data
    }
    return res.data
  })
}

const PackageService = {
  createPackage,
  UpdatePackage,
  allPackage,
  getPackageById,
  updateImage,
  setVisibility,
  setBookingStatus
}
export default PackageService
