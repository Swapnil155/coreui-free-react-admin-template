/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import {
    CForm,
    CFormTextarea,
    CButton,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CBadge,
    CFormLabel,
    CFormFeedback,
} from '@coreui/react'

const CustomStyles = () =>{
    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
}
    return(
        <CForm 
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        >
        <div className="mb-3">
        <CCol md={12}>
          <CFormLabel htmlFor="validationReply">Reply</CFormLabel>
          <CFormTextarea 
            type="text" id="validationReply"  
            rows="3" 
            aria-describedby="inputGroupPrependFeedback"
            feedbackValid="Please enter the reply."
            required
              ></CFormTextarea>

        </CCol>
        </div>
        <div className="mb-3">
        <CButton color="primary" type="submit">
      Submit 
    </CButton>
  </div>
        </CForm>
    )
}
export default function ShowReview() {
  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>customerMailId@mail, </strong> <small> <CBadge color='info' shape="rounded-pill">4.5 rating</CBadge></small>
          <div style={{marginLeft: '1rem'}}><strong>Review,</strong>
          <div><small>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus elit nibh, nec fringilla nisi dapibus vel. Donec eleifend lectus malesuada, porta purus quis, volutpat turpis. Praesent sollicitudin lacinia tellus vel faucibus. Donec finibus interdum tellus a molestie. Aliquam iaculis sit amet tortor sit amet pharetra. Proin sollicitudin erat ante, in iaculis purus lobortis a. Mauris lacinia justo ac elit mattis pretium. Nulla lacus turpis, malesuada sit amet interdum in, tristique sed mi. Etiam eget sollicitudin mauris. Sed in cursus orci. Duis ligula tortor, pretium vel tempus et, consectetur vel sem. Aliquam erat volutpat. Integer consequat, nisl nec fringilla consectetur, eros felis gravida risus, at ultrices sapien dolor quis sapien. Praesent id lorem a turpis vehicula ultrices. Integer id aliquet massa. Aliquam pharetra egestas urna vel mollis.</small></div>
          </div>
        </CCardHeader>
        <CCardBody>
          {CustomStyles()}
        </CCardBody>
      </CCard>
    </CCol>
     </CRow>
  )
}
