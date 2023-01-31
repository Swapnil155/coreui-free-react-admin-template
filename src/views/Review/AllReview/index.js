/* eslint-disable prettier/prettier */
import React from 'react'

import CIcon from '@coreui/icons-react'
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
 import {cilStar} from '@coreui/icons'

const CustomStyles = () =>{
    return(
        <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Post Dates</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>customerMailId@mail</CTableDataCell>
            <CTableDataCell>12/12/2022</CTableDataCell>
            <CTableDataCell><CIcon icon={cilStar} size="sm"/> 4.5</CTableDataCell>
            
            <CTableDataCell><CButton component='a' href='/Review/Show-Review' color="info" variant="ghost">Show</CButton></CTableDataCell>
            <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
      
          </CTableRow>
        
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>customerMailId@mail</CTableDataCell>
            <CTableDataCell>12/12/2022</CTableDataCell>
            <CTableDataCell><CIcon icon={cilStar} size="sm"/> 5</CTableDataCell>
            
            <CTableDataCell><CButton component='a' href='/Review/Show-Review' color="info" variant="ghost">Show</CButton></CTableDataCell>
            <CTableDataCell><CBadge color="success">Submit</CBadge></CTableDataCell>
      
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>customerMailId@mail</CTableDataCell>
            <CTableDataCell>12/12/2022</CTableDataCell>
            <CTableDataCell><CIcon icon={cilStar} size="sm"/> 3.5</CTableDataCell>
            
            <CTableDataCell><CButton component='a' href='/Review/Show-Review' color="info" variant="ghost">Show</CButton></CTableDataCell>
            <CTableDataCell><CBadge color="warning">pending</CBadge></CTableDataCell>
      
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>customerMailId@mail</CTableDataCell>
            <CTableDataCell>12/12/2022</CTableDataCell>
            <CTableDataCell><CIcon icon={cilStar} size="sm"/> 4</CTableDataCell>
            
            <CTableDataCell><CButton component='a' href='/Review/Show-Review' color="info" variant="ghost">Show</CButton></CTableDataCell>
            <CTableDataCell><CBadge color="success">Submit</CBadge></CTableDataCell>
      
          </CTableRow>
        </CTableBody>
        </CTable>
    )
}

export default function AllReview() {
  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>All Review</strong> <small></small>
        </CCardHeader>
        <CCardBody>
          {CustomStyles()}
        </CCardBody>
      </CCard>
    </CCol>
     </CRow>
  )
}
