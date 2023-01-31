/* eslint-disable prettier/prettier */
import React, { useState, Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import PackageService from 'src/services/package.service'
import { useNavigate } from 'react-router-dom'

class EditorContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    )
  }
}

export default function AddProduct() {
  const [validated, setValidated] = useState(false)
  const [tourDetails, setTourDetails] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    // event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      try {
        await PackageService.createPackage(tourDetails).then((response) => {
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

  const onchangeHandler = (e) => {
    const { name, value } = e.target

    setTourDetails({
      ...tourDetails,
      [name]: value,
    })
  }

  const imageChangeHandler = (e) => {
    let galleryimage = []
    const { name, files } = e.target
    setTourDetails({
      ...tourDetails,
      [name]: files[0],
    })

    if (name === 'galleryImage') {
      for (let index = 0; index < files.length; index++) {
        console.log(index)
        galleryimage.push(files[index])
      }
      setTourDetails({
        ...tourDetails,
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
            defaultValue={tourDetails.tourName}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        {/* <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02">Slug Name</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom02"
            placeholder="Tour-Name"
            name="slugName"
            onChange={onchangeHandler}
            defaultValue={tourDetails.slugName}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol> */}
        <CCol md={12}>
          <CFormLabel htmlFor="validationAboutUs">About Tour</CFormLabel>
          <CFormTextarea
            type="text"
            id="validationAboutUs"
            rows="3"
            name="aboutTour"
            onChange={onchangeHandler}
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
              defaultValue=""
              aria-describedby="inputGroupPrepend"
              name="startDate"
              onChange={onchangeHandler}
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
            // defaultValue={tourDetails.price}
            // disabled
            required
          />
          <CFormFeedback invalid>Please enter the Discount</CFormFeedback>
        </CCol>

        <CCol md={5}>
          <CFormLabel htmlFor="validationCustomPrice">Total Seats</CFormLabel>
          <CFormInput
            type="number"
            id="validationCustomPrice"
            name="totalSeats"
            onChange={onchangeHandler}
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
            required
          ></CFormTextarea>
          <CFormFeedback invalid>Please fill blank input.</CFormFeedback>
        </CCol>
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
      <CCol sm={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Product</strong> <small></small>
          </CCardHeader>
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
