/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import PackageService from 'src/services/package.service'



export default function ShowProducts() {

  const [visible, setVisible] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)

  const initialState = {
    Title: { slug: '', tourName: '' },
    Tour_Booking: { avaliableSeats: '', totalSeats: '' },
    Tour_Dates: { startDate: '', endDate: '' },
    Tour_Image: {
      coverImage: '',
      galleryImage: [],
    },
    Tour_Location: { Destination: '', State: '', Pin: '' },
    Tour_Maintain: { tour_publish_date: '', },
    tour_Visibility: false ,
    BookingStatus: false,
    Tour_Price: { price: '' },
    // Tour_author: {
    //   authorId: '',
    //   authorProfile: '',
    //   orgName: '',
    //   authorSayAboutTour: '',
    // },
    Tour_destails: { aboutTour: '', highlites: '', authorSayAboutTour : '' },
    Tour_id: '',
    _id : ''
  }
  const [packageInfo, setPackageInfo] = useState(initialState)
  let { slug, id } = useParams()

  

  useEffect(() => {
    PackageService.getPackageById(id).then((response) => {
      setPackageInfo(response.data)
      // return response
      console.log(response)
    })
  }, [id])

  console.info(packageInfo)
  // const Title = packageInfo.Title

  const onClickHandler = () => {
    alert('Are you Sure')
  }

  const onClickeChangeVisibility = async () => {
    // alert('fuck shiit')
    const value = packageInfo.tour_Visibility
    console.log(value)
    await PackageService.setVisibility(id, value).then((response)=>{
      if (response.status === 200) {
      setPackageInfo(response.data)
      window.location.reload()
      }
      console.log(response)
    })
    setVisible(!visible)
  }
  console.log(packageInfo)

  const CustomStyles = () => {
 
  
    const modelTourVisibilty = () => {
      return (
        <>
          <CButton color="warning" variant="outline" onClick={() => setVisible(!visible)}>
            Change visibility
          </CButton>
          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Tour visibility Change</CModalTitle>
            </CModalHeader>
            <CModalBody>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton onClick={()=> onClickeChangeVisibility()} color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </>
      )
    }
  
    const modelTourDelete = () => {
      return (
        <>
          <CButton color="danger" variant="outline" onClick={() => setVisibleDelete(!visible)}>
            Delete
          </CButton>
          <CModal alignment="center" visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
            <CModalHeader>
              <CModalTitle>Tour Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                Close
              </CButton>
              <CButton color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </>
      )
    }
  
    return (
      <>
        <CTable bordered borderColor="primary" responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">Title</CTableHeaderCell>
              <CTableDataCell>{packageInfo.Title.tourName}</CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell rowSpan={2} scope="row">
                Tour Booking
              </CTableHeaderCell>
              <CTableDataCell>
                <strong>Total Seats : </strong>
                {packageInfo.Tour_Booking.totalSeats}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>Avaliable Seats : </strong>
                {packageInfo.Tour_Booking.avaliableSeats}
              </CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell rowSpan={2} scope="row">
                Tour Dates
              </CTableHeaderCell>
              <CTableDataCell>
                <strong>Start date : </strong>
                {packageInfo.Tour_Dates.startDate}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>End date : </strong>
                {packageInfo.Tour_Dates.endDate}
              </CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell rowSpan={3} scope="row">
                Tour Location
              </CTableHeaderCell>
              <CTableDataCell>
                <strong>Destination : </strong>
                {packageInfo.Tour_Location.Destination}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>State : </strong>
                {packageInfo.Tour_Location.State}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>pin : </strong>
                {packageInfo.Tour_Location.Pin}
              </CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell rowSpan={2} scope="row">
                Tour destails
              </CTableHeaderCell>
              <CTableDataCell>
                <strong>About Tour : </strong>
                {packageInfo.Tour_destails.aboutTour}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>Highlights : </strong>
                {packageInfo.Tour_destails.highlites}
              </CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell scope="row">Host Say</CTableHeaderCell>
              <CTableDataCell>{packageInfo.Tour_destails.authorSayAboutTour}</CTableDataCell>
            </CTableRow>
  
            <CTableRow>
              <CTableHeaderCell rowSpan={2} scope="row">
                Tour Images
              </CTableHeaderCell>
              <CTableDataCell>
                <strong> Cover Image : </strong>
                {/* {packageInfo.Tour_Image.coverImage} */}
                <img style={{width : '10rem'}} src={`${packageInfo.Tour_Image.coverImage}`} alt='' />
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>Gallery Image : </strong>
                {packageInfo.Tour_Image.galleryImage.map((image, index)=>(
                  <img key={index} style={{width : '10rem',marginRight : '2rem'}} src={`${image}`} alt='' />   
                ))}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <CCol className="d-grid gap-2 d-md-flex justify-content-md-start">
          <CButton
            color="info"
            className="me-md-1"
            variant="outline"
            component="a"
            href={`/Product/Edit-Product/${packageInfo.Title.slug}&${packageInfo._id}`}
          >
            Edit
          </CButton>
          {modelTourDelete()}
          {modelTourVisibilty()}
        </CCol>
      </>
    )
  }


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={8}>
                <strong>Tour name</strong>{' '}
                <small>
                  <CBadge color={packageInfo.tour_Visibility?'success' : 'danger'} shape="rounded-pill">
                    {' '}
                    {packageInfo.tour_Visibility?'Public' : 'Private'}
                  </CBadge>
                </small>{' '}
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
