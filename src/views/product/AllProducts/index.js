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
import PackageService from 'src/services/package.service'

const CustomStyles = () => {
  const [visible, setVisible] = useState(false)
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

  const [visibleDelete, setVisibleDelete] = useState(false)
  const modelTourVisibilty = () => {
    return (
      <>
        <CButton CButton color="success" variant="ghost" onClick={() => setVisible(!visible)}>
          Public
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
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  const modelTourDelete = () => {
    return (
      <>
        <CButton CButton color="danger" variant="ghost" onClick={() => setVisibleDelete(!visible)}>
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
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Package</CTableHeaderCell>
          <CTableHeaderCell scope="col">Dates</CTableHeaderCell>
          <CTableHeaderCell scope="col">Price</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          <CTableHeaderCell scope="col">Post</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {packages!=="undefined"?
         packages.map((pack, index) => (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
            <CTableDataCell>{pack.Title.tourName}</CTableDataCell>
            <CTableDataCell>{pack.Tour_Dates.startDate}</CTableDataCell>
            <CTableDataCell>{pack.Tour_Price.price}</CTableDataCell>

            <CTableDataCell>
              <CButton
                component="a"
                href={`/Product/Show-Product/${pack.Title.slug}&${pack._id}`}
                color="info"
                variant="ghost"
              >
                Show
              </CButton>
            </CTableDataCell>
            <CTableDataCell>
              <CBadge
                color={pack.tour_Visibility ? 'success' : 'danger'}
                shape="rounded-pill"
              >
                {pack.tour_Visibility ? 'Public' : 'Private'}
                
              </CBadge>
            </CTableDataCell>
          </CTableRow>
        )) 
        : 'No More Product' }

        
      </CTableBody>
    </CTable>
  )
}

export default function AllProducts() {
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
