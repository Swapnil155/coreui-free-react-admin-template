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
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import PackageService from 'src/services/package.service'

const CustomStyles = () => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
          <CTableHeaderCell scope="col">Booking Dates</CTableHeaderCell>
          <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
          <CTableHeaderCell scope="col">Booking</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">1</CTableHeaderCell>
          <CTableDataCell>Custmor Name</CTableDataCell>
          <CTableDataCell>12/12/2022</CTableDataCell>

          <CTableDataCell>
            <CBadge color="success">success</CBadge>
          </CTableDataCell>
          <CTableDataCell>
            <CBadge color="success">confirm</CBadge>
          </CTableDataCell>
        </CTableRow>

        <CTableRow>
          <CTableHeaderCell scope="row">2</CTableHeaderCell>
          <CTableDataCell>Custmor Name</CTableDataCell>
          <CTableDataCell>12/12/2022</CTableDataCell>

          <CTableDataCell>
            <CBadge color="success">success</CBadge>
          </CTableDataCell>
          <CTableDataCell>
            <CBadge color="success">confirm</CBadge>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">3</CTableHeaderCell>
          <CTableDataCell>Custmor Name</CTableDataCell>
          <CTableDataCell>12/12/2022</CTableDataCell>

          <CTableDataCell>
            <CBadge color="warning">Pending</CBadge>
          </CTableDataCell>
          <CTableDataCell>
            <CBadge color="warning">on going</CBadge>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">4</CTableHeaderCell>
          <CTableDataCell>Custmor Name</CTableDataCell>
          <CTableDataCell>12/12/2022</CTableDataCell>

          <CTableDataCell>
            <CBadge color="danger">Cancle</CBadge>
          </CTableDataCell>
          <CTableDataCell>
            <CBadge color="danger">Cancle</CBadge>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

const ShowBooking = () => {
  const initialState = {
    tourName: '',
    avaliableSeats: '',
    bookingStatus: '',
  }
  const [packageInfo, setPackageInfo] = useState(initialState)
  let { slug, id } = useParams()

  console.info(slug, id)

  useEffect(() => {
    PackageService.getPackageById(id).then((response) => {
      setPackageInfo({
        ...packageInfo,
        tourName: response.data.Title.tourName,
        avaliableSeats: response.data.Tour_Booking.avaliableSeats,
        bookingStatus: response.data.BookingStatus,
      })
      // return response
      console.log(response)
    })
  }, [id])

  // const Title = packageInfo.Title

  const onClickHandler = async () => {
    // alert('fuck shiit')
    const value = packageInfo.bookingStatus 
    console.log(value)
    await PackageService.setBookingStatus(id, value).then((response)=>{
      setPackageInfo({
        ...packageInfo,
        bookingStatus : response.data.BookingStatus})
      console.log(response)
      window.location.reload()
    })
    
  }

  console.log(packageInfo)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={8}>
                <strong>Booking</strong> <small>{packageInfo.tourName}, </small>{' '}
                <CBadge color="info" shape="rounded-pill">
                  {' '}
                  Avaliable Seat {packageInfo.avaliableSeats}
                </CBadge>
              </CCol>
              <CCol className="d-grid gap-2 d-md-flex justify-content-md-end" xs={4}>
                <CButton
                  color={packageInfo.bookingStatus ? 'danger' : 'success'}
                  className="me-md-2"
                  onClick={onClickHandler}
                >
                  {packageInfo.bookingStatus ? 'Close' : 'Open'} Booking
                </CButton>
                <CButton color="success">Print</CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ShowBooking
