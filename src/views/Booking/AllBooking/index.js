/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react'
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
import PackageService from 'src/services/package.service'

const CustomStyles = () => {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    PackageService.allPackage().then(
      (res) => {
        setPackages(res.data.data)
      },
      (error) => {
        console.log(error)
      },
    )
  }, [])

  console.log(packages)
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Package</CTableHeaderCell>
          <CTableHeaderCell scope="col">Dates</CTableHeaderCell>
          <CTableHeaderCell scope="col">Seat</CTableHeaderCell>
          <CTableHeaderCell scope="col">Booking</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>

        {packages!=="undefined"? packages.map((pack, index) => (
          
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
            <CTableDataCell>{pack.Title.tourName}</CTableDataCell>
            <CTableDataCell>{pack.Tour_Dates.startDate}</CTableDataCell>
            <CTableDataCell>{pack.Tour_Booking.totalSeats}</CTableDataCell>

            <CTableDataCell>
              <CButton component="a" href={`/Booking/Show-Booking/${pack.Title.slug}&${pack._id}`} color="info" variant="ghost">
                Show
              </CButton>
            </CTableDataCell>
            <CTableDataCell>
              <CBadge color={pack.BookingStatus? 'success' : 'danger'}>{pack.BookingStatus ? 'Open' : 'Close'}</CBadge>
            </CTableDataCell>
          </CTableRow>
          
        )) : 'No More Product' }

       {/* { } */}


      </CTableBody>
    </CTable>
  )
}

export default function AllBooking() {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Product</strong> <small></small>
          </CCardHeader>
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
