/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CWidgetStatsA, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CBadge, CForm, CFormLabel, CFormInput, CButton } from '@coreui/react'
import {cilArrowTop, cilOptions} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

import { CChartLine } from '@coreui/react-chartjs'
import React from 'react'

export default function index() {

  const widgetsAnualIncome = () => {
    return (
      <CWidgetStatsA
        className="mb-4"
        color="info"
        value={
          <>
            $9.000{' '}
            <span className="fs-6 fw-normal">
              (40.9% <CIcon icon={cilArrowTop} />)
            </span>
          </>
        }
        title="Annual income"
        action={
          <CDropdown alignment="end">
            <CDropdownToggle color="transparent" caret={false} className="p-0">
              <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        }
        chart={
          <CChartLine
            className="mt-3 mx-3"
            style={{ height: '70px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,.55)',
                  pointBackgroundColor: '#39f',
                  data: [1, 18, 9, 17, 34, 22, 11],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  min: -9,
                  max: 39,
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 1,
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }}
          />
        }
      />
        )
  }

  const widgetsWeeklyIncome = () => {
    return (
      <CWidgetStatsA
      className="mb-4"
      color="success"
      value={
        <>
          $9.000{' '}
          <span className="fs-6 fw-normal">
            (40.9% <CIcon icon={cilArrowTop} />)
          </span>
        </>
      }
      title="Weekly income"
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="p-0">
            <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: '#2eb85c',
                data: [1, 18, 9, 17, 34, 22, 11],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: -9,
                max: 39,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
    )
  }

  const paymentTable = () => {
    return (
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>#</CTableHeaderCell>
            <CTableHeaderCell scope='col'>User</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Reference No</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Payment method</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Activty</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          <CTableRow color='success'>
            <CTableHeaderCell scope='row'>1</CTableHeaderCell>
            <CTableDataCell>user name</CTableDataCell>
            <CTableDataCell>
              <div><strong>7894561230</strong></div>
              <div className="small text-medium-emphasis">
                <span>Date : Today</span> | Time : 00.45
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div><strong>$50</strong></div>
              <span className='small text-medium-emphasis'>Method : UPI</span>
            </CTableDataCell>
            <CTableDataCell>
              <CBadge className='mt-2' color="success" shape="rounded-pill">Paid</CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <div className="small text-medium-emphasis">last login</div>
              <strong>10 sec ago</strong>
            </CTableDataCell>
          </CTableRow>

          {/* second row */}
          <CTableRow color='warning'>
            <CTableHeaderCell scope='row'>1</CTableHeaderCell>
            <CTableDataCell>user name</CTableDataCell>
            <CTableDataCell>
              <div><strong>7894561230</strong></div>
              <div className="small text-medium-emphasis">
                <span>Date : Today</span> | Time : 00.45
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div><strong>$50</strong></div>
              <span className='small text-medium-emphasis'>Method : UPI</span>
            </CTableDataCell>
            <CTableDataCell>
              <CBadge className='mt-2' color="warning" shape="rounded-pill">Pending</CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <div className="small text-medium-emphasis">last login</div>
              <strong>10 sec ago</strong>
            </CTableDataCell>
          </CTableRow>
          {/* end second row */}

          {/* third row */}
          <CTableRow color='danger'>
            <CTableHeaderCell scope='row'>1</CTableHeaderCell>
            <CTableDataCell>user name</CTableDataCell>
            <CTableDataCell>
              <div><strong>7894561230</strong></div>
              <div className="small text-medium-emphasis">
                <span>Date : Today</span> | Time : 00.45
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div><strong>$50</strong></div>
              <span className='small text-medium-emphasis'>Method : UPI</span>
            </CTableDataCell>
            <CTableDataCell>
              <CBadge className='mt-2' color="danger" shape="rounded-pill">cancel</CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <div className="small text-medium-emphasis">last login</div>
              <strong>10 sec ago</strong>
            </CTableDataCell>
          </CTableRow>
          {/* end third row */}
        </CTableBody>
      </CTable>
    )
  }

  const addPaymentAddress = () => {
    return (
      
        <CForm>
          <CRow>
          <CCol sm={12}  className='mb-4'>
            <CFormLabel htmlFor='cardNo'>Card Number</CFormLabel>
            <CFormInput
              type='number'
              id='cardNo'
              name='cardNo'
              defaultValue={''}
              placeholder={`0000  0000  0000  0000`}
              required
            />
          </CCol>
          <CCol sm={6}>
            <CFormLabel htmlFor='ExipryDate'>Expiry Date</CFormLabel>
            <CFormInput 
              type='text'
              id='ExipryDate'
              name='expiryDate'
              defaultValue={''}
              placeholder = {` 02 / 25`}
              required
            />
          </CCol>
          <CCol sm={6}>
            <CFormLabel htmlFor='CVno'>CVG Number</CFormLabel>
            <CFormInput
              type='password'
              id='CVno'
              name='CVno'
              defaultValue={''}
              placeholder = {` *** `}
              required
            />
          </CCol>
          <div className='mt-3'>
          <CButton type='submit' color='primary'>Add Card</CButton>
        </div>
      </CRow>
        </CForm>
    )
  }
  return (
    <CContainer>
      <CRow>
        <CCol md={7}>
          <CCard>
            <CCardHeader>
              <strong>Add Card</strong>
            </CCardHeader>
            <CCardBody>
              {addPaymentAddress()}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={5}>
          <CRow>
            <CCol>
              {widgetsAnualIncome()}
            </CCol>
            
            <CCol>
              {widgetsWeeklyIncome()}
            </CCol>
          </CRow>
        </CCol>

        <CCol md={12} className='mt-4'>
          <CCard>
            <CCardHeader>
              <strong>Payments</strong>
            </CCardHeader>
            <CCardBody>
              {paymentTable()}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
    </CContainer>
  )
}
