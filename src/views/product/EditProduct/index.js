/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import PackageService from 'src/services/package.service'

const initialState = {
  Title: { slug: '', tourName: '' },
  Tour_Booking: { BookingStatus: false, avaliableSeats: '', totalSeats: '' },
  Tour_Dates: { startDate: '', endDate: '' },
  Tour_Image: {
    coverImage: '',
    galleryImage: [],
  },
  Tour_Location: { Destination: '', State: '', Pin: '' },
  Tour_Maintain: { tour_publish_date: '', tour_Visibility: false },
  Tour_Price: { price: '' },
  Tour_author: {
    authorId: '',
    authorProfile: '',
    orgName: '',
    authorSayAboutTour: '',
  },
  Tour_destails: { aboutTour: '', highlites: '' },
  Tour_id: '',
  _id: '',
}

const initialStatePackage = {
  tourName: '',
  aboutTour: '',
  startDate: '',
  endDate: '',
  city: '',
  state: '',
  pincode: '',
  highlights: '',
  hostSay: '',
  totalSeats: '',
  price: '',
  _id: '',
}
const initialstateImage = {
  galleryImage: [],
  _id: '',
}
export default function EditProduct() {
  const [validated, setValidated] = useState(false)
  const [imgValidated, setImgValidated] = useState(false)
  const [tourDetails, setTourDetails] = useState(initialState)
  const [image, setImage] = useState(initialstateImage)
  const navigate = useNavigate()

  const [packageInfo, setPackageInfo] = useState(initialStatePackage)
  let { slug, id } = useParams()

  useEffect(() => {
    PackageService.getPackageById(id).then((response) => {
      setTourDetails(response.data)
      // return response
      console.log(response)
    })
    setPackageInfo({
      tourName: tourDetails.Title.tourName,
      aboutTour: tourDetails.Tour_destails.aboutTour,
      startDate: tourDetails.Tour_Dates.startDate,
      endDate: tourDetails.Tour_Dates.endDate,
      city: tourDetails.Tour_Location.Destination,
      state: tourDetails.Tour_Location.State,
      pincode: tourDetails.Tour_Location.Pin,
      highlights: tourDetails.Tour_destails.highlites,
      hostSay: tourDetails.Tour_destails.authorSayAboutTour,
      totalSeats: tourDetails.Tour_Booking.totalSeats,
      price: tourDetails.Tour_Price.price,
      _id: tourDetails._id,
    })
  }, [
    id,
    tourDetails.Title.tourName,
    tourDetails.Tour_Booking.totalSeats,
    tourDetails.Tour_Dates.endDate,
    tourDetails.Tour_Dates.startDate,
    tourDetails.Tour_Location.Destination,
    tourDetails.Tour_Location.Pin,
    tourDetails.Tour_Location.State,
    tourDetails.Tour_Price.price,
    tourDetails.Tour_destails.aboutTour,
    tourDetails.Tour_destails.authorSayAboutTour,
    tourDetails.Tour_destails.highlites,
    tourDetails._id,
  ])

  const handleSubmit = async (event) => {
    // event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      try {
        await PackageService.UpdatePackage(packageInfo).then((response) => {
          console.log(response)
          if (response.status === 200) {
            navigate('/Product/All-Product')
            window.location.reload()
          }
        })
      } catch (error) {
        console.log(error)
      }
      console.warn('all done', tourDetails)
    }
    setValidated(true)
  }

  const imgSubmitHandle = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      try {
        await PackageService.updateImage(image).then((response) => {
          console.log(response)
          if (response.status === 200) {
            navigate('/Product/All-Product')
            window.location.reload()
          }
        })
      } catch (error) {
        console.log(error)
      }
      console.warn('all done', image)
    }
    setImgValidated(true)
  }

  const onchangeHandler = (e) => {
    const { name, value } = e.target

    setPackageInfo({
      ...packageInfo,
      [name]: value,
    })
    console.info(packageInfo)
  }
  // console.log(packageInfo)

  const imageChangeHandler = (e) => {
    let galleryimage = []
    const { name, files } = e.target
    setImage({
      ...image,
      [name]: files[0],
      _id: tourDetails._id,
    })

    if (name === 'galleryImage') {
      for (let index = 0; index < files.length; index++) {
        console.log(index)
        galleryimage.push(files[index])
      }
      setImage({
        ...image,
        galleryImage: galleryimage,
      })
    }
    console.log(galleryimage)
  }

  const CustomStyles = () => {
    // console.log(tourDetails)

    return (
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <CCol md={12}>
          <CFormLabel htmlFor="validationCustom01">Tour Name</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom01"
            placeholder="Tour Name"
            name="tourName"
            onChange={onchangeHandler}
            defaultValue={packageInfo.tourName}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationAboutUs">About Tour</CFormLabel>
          <CFormTextarea
            type="text"
            id="validationAboutUs"
            rows="3"
            name="aboutTour"
            onChange={onchangeHandler}
            defaultValue={packageInfo.aboutTour}
            required
          ></CFormTextarea>
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustomStartDate">Start Date</CFormLabel>
          <CInputGroup className="has-validation">
            <CFormInput
              type="Date"
              id="validationCustomStartDate"
              aria-describedby="inputGroupPrepend"
              name="startDate"
              onChange={onchangeHandler}
              defaultValue={packageInfo.startDate}
              required
            />
            <CFormFeedback invalid>Please choose a Starting Date.</CFormFeedback>
          </CInputGroup>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustomEndDate">End Date</CFormLabel>
          <CFormInput
            type="date"
            id="validationCustomEndDate"
            name="endDate"
            onChange={onchangeHandler}
            defaultValue={packageInfo.endDate}
            required
          />
          <CFormFeedback invalid>Please choose a Ending Date.</CFormFeedback>
        </CCol>
        {/* 
        <CCol md={5}>
          <CFormLabel htmlFor="validationCustomPrice">Actual Price</CFormLabel>
          <CFormInput
            type="number"
            id="validationCustomPrice"
            name="actualPrice"
            onChange={onchangeHandler}
            // onKeyUp={calculatePrice}
            required
          />
          <CFormFeedback invalid>Please enter the Price</CFormFeedback>
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustomDiscount">Discount</CFormLabel>
          <CFormInput
            type="number"
            id="validationCustomDiscount"
            name="discount"
            onChange={onchangeHandler}
            // onKeyUp={calculatePrice}
            required
          />
          <CFormFeedback invalid>Please enter the Discount</CFormFeedback>
        </CCol> */}

        <CCol md={3}>
          <CFormLabel htmlFor="validationCustomTotal">Price</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustomTotal"
            name="price"
            onChange={onchangeHandler}
            defaultValue={packageInfo.price}
            // disabled
            required
          />
          <CFormFeedback invalid>Please enter the Discount</CFormFeedback>
        </CCol>

        <CCol md={5}>
          <CFormLabel htmlFor="validationAvalabile">Avaliable Seats</CFormLabel>
          <CFormInput
            type="number"
            id="validationAvalabile"
            name="avaliableSeats"
            onChange={onchangeHandler}
            defaultValue={packageInfo.totalSeats}
            disabled
            required
          />
          <CFormFeedback invalid>Please enter the seats</CFormFeedback>
        </CCol>

        <CCol md={5}>
          <CFormLabel htmlFor="validationCustomPrice">Total Seats</CFormLabel>
          <CFormInput
            type="number"
            id="validationCustomPrice"
            name="totalSeats"
            onChange={onchangeHandler}
            defaultValue={packageInfo.totalSeats}
            // onKeyUp={calculatePrice}
            required
          />
          <CFormFeedback invalid>Please enter the seats</CFormFeedback>
        </CCol>

        <CCol sm={7}>
          <CFormLabel htmlFor="validationCustomCity">Destination</CFormLabel>
          <CFormInput
            placeholder="City"
            id="validationCustomCity"
            name="city"
            onChange={onchangeHandler}
            aria-label="City"
            defaultValue={packageInfo.city}
            required
          />
          <CFormFeedback invalid>Please fill the City.</CFormFeedback>
        </CCol>

        <CCol sm>
          <CFormLabel htmlFor="validationCustomState">State</CFormLabel>
          <CFormInput
            type="text"
            placeholder="State"
            id="validationCustomState"
            name="state"
            onChange={onchangeHandler}
            aria-label="State"
            defaultValue={packageInfo.state}
            required
          />
          <CFormFeedback invalid>Please fill the State.</CFormFeedback>
        </CCol>

        <CCol sm>
          <CFormLabel htmlFor="validationCustomPinCode">Pin</CFormLabel>
          <CFormInput
            type="number"
            placeholder="pin"
            id="validationCustomPinCode"
            name="pincode"
            onChange={onchangeHandler}
            defaultValue={packageInfo.pincode}
            aria-label="pin"
            required
          />
          <CFormFeedback invalid>Please fill the Pincode.</CFormFeedback>
        </CCol>

        {/* <CCol md={12}>
          <CFormLabel htmlFor="validationCustomHighlights">Highlights</CFormLabel>
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              height: '20rem',
              overflow: 'auto',
            }}
          >
            <EditorContainer />
          </div>
        </CCol> */}

        <CCol md={12}>
          <CFormLabel htmlFor="validationCustomHighlights">Highlights</CFormLabel>
          <CFormTextarea
            type="text"
            id="validationCustomHighlights"
            rows="4"
            name="highlights"
            onChange={onchangeHandler}
            defaultValue={packageInfo.highlights}
            required
          ></CFormTextarea>
          <CFormFeedback invalid>Please fill blank input.</CFormFeedback>
        </CCol>

        <CCol md={12}>
          <CFormLabel htmlFor="validationCustomHostCmt">Host Say Something about Tour</CFormLabel>
          <CFormTextarea
            type="text"
            id="validationCustomHostCmt"
            rows="3"
            name="hostSay"
            onChange={onchangeHandler}
            defaultValue={packageInfo.hostSay}
            required
          ></CFormTextarea>
          <CFormFeedback invalid>Please fill blank input.</CFormFeedback>
        </CCol>

        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit form
          </CButton>
        </CCol>
      </CForm>
    )
  }

  const CustomStylesImage = () => {
    return (
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={imgValidated}
        onSubmit={imgSubmitHandle}
        encType="multipart/form-data"
      >
        <CCol md={12}>
          <CFormLabel htmlFor="validationCustomHImg">Cover Image</CFormLabel>
          <CFormInput
            type="File"
            id="validationCustomHImg"
            name="coverImg"
            onChange={imageChangeHandler}
            required
          />
          <CFormFeedback invalid>Please Only One file select.</CFormFeedback>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationCustomGImg">Gallery Image</CFormLabel>
          <CFormInput
            type="File"
            id="validationCustomGImg"
            name="galleryImage"
            multiple
            onChange={imageChangeHandler}
            required
          />
          <CFormFeedback invalid>please select the files.</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit form
          </CButton>
        </CCol>
      </CForm>
    )
  }
  return (
    <CRow>
      <CCol md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Product</strong> <small></small>
          </CCardHeader>
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
      <CCol md={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Images</strong> <small></small>
          </CCardHeader>
          <CCardBody>{CustomStylesImage()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
