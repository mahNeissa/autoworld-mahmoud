import React, {useState, useMemo} from 'react'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText, MoreVertical, Send, Plus, Key, User, Eye, Trash, Paperclip} from 'react-feather'
import {OrderStatus, trueFaulse} from './order-status'
import 'react-photo-view/dist/react-photo-view.css'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import {
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupAddon, InputGroup, InputGroupText,
  Row,
  Col,
  Table,
  Card, CardBody, CardText
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'
import defaultUserIcon from '../../assets/images/no-image.jpg'
import pdfIcon from '../../assets/images/PDF.jpg' // Replace with your PDF icon path
import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import StatusStepper from "../../../../components/StatusStepper" // Import StatusStepper


const BasicInfoModal = (props) => {
  const loading = useSelector(state => state.app.loading)
  const { errors, control } = useForm()
  const [open, setOpen] = useState(true)
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(null)
  const isViewAction = true
  const _close = () => {
    setOpen(false)
    props.onClose()
  }
  const openMap = () => {
    if (props.data.purchaseOrder.profileAddress && props.data.purchaseOrder.profileAddress.lat && props.data.purchaseOrder.profileAddress.lng) {
      const { lat, lng } = props.data.purchaseOrder.profileAddress
      const mapUrl = `http://maps.google.com/maps?q=${lat},${lng}` // Corrected Google Maps URL
      window.open(mapUrl, '_blank') // Open in a new tab
    }
  }
  // StatusStepper Logic
  const orderStatusValue = parseInt(_.get(props, 'data.status'))
  const currentStep = orderStatusValue !== undefined ? orderStatusValue : 0
  const statusSteps = [
    { label: "New", name: "New", content: <h1></h1> },
    { label: "Reply", name: "Reply", content: <h1></h1> },
    { label: "Selected", name: "Selected", content: <h1></h1> },
    { label: "Ordered", name: "Ordered", content: <h1></h1> },
    { label: "Packaging", name: "Packaging", content: <h1></h1> },
    { label: "Sent", name: "Sent", content: <h1></h1> },
    { label: "Finished", name: "Finished", content: <h1></h1> }
  ]

  const groupedProducts = useMemo(() => {
    if (Array.isArray(props.data)) {
      return _.groupBy(props.data.filter((item) => item && item.purchaseOrder), (item) => item.purchaseOrder.id)
    } else if (props.data && props.data.purchaseOrder) {
      return _.groupBy([props.data], (item) => item.purchaseOrder.id)
    } else {
      return {}
    }
  }, [props.data])
  return (
      <Modal
          isOpen={open}
          toggle={_close}
          unmountOnClose={true}
          backdrop={true}
          className='sidebar-lg'
          contentClassName='p-0'
          modalClassName='modal-slide-in sidebar-todo-modal'
          style={{ maxWidth: '75%', width: '75%' }}

      >

        <Form className='flex-grow-1 d-flex flex-column' >
          {/* StatusStepper added here */}

          <StatusStepper startingStep={currentStep} steps={statusSteps}  toggle={_close} >
          </StatusStepper>
          <Card className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
            <div style={{ width: '100%', padding: '1rem', height: '15rem', overflow: 'auto' }}>
              <CardBody >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h1 style={{ margin: 0, fontSize: '2em', color: 'red', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                    Purchase Orders
                  </h1>
                  <CardText className="mb-25" style={{ color: '#5E5873' }}>
                    Serial: <strong>{props.data.purchaseOrder.serial}</strong>
                  </CardText>
                </div>
                <div>
                  <CardText className="mb-25" style={{ color: '#5E5873', textAlign: 'right' }}>
                    Date Issued:{" "}
                    <strong>
                      {props.data.purchaseOrder.insertDate
                          ? (() => {
                            const date = new Date(props.data.purchaseOrder.insertDate)
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).padStart(2, "0")
                            const day = String(date.getDate()).padStart(2, "0")
                            const hours = String(date.getHours()).padStart(2, "0")
                            const minutes = String(date.getMinutes()).padStart(2, "0")
                            return `${year}-${month}-${day} ${hours}:${minutes}`
                          })()
                          : "N/A"}
                    </strong>
                  </CardText>
                </div>
                <div>
                  <CardText className='mb-25' style={{fontStyle: 'italic', whiteSpace: 'nowrap'}}>Name:
                    <strong style={{marginRight:'2%'}}>{props.data.purchaseOrder.user.name}</strong>
                  </CardText>
                  <CardText className='mb-25' style={{fontStyle: 'italic', whiteSpace: 'nowrap'}}>Mobile:
                    <strong style={{marginRight:'2%'}}>{props.data.purchaseOrder.user.mobile}</strong>
                  </CardText>
                  <CardText className='mb-25' style={{fontStyle: 'italic', whiteSpace: 'nowrap'}}>Address:
                    {props.data.purchaseOrder.profileAddress ? (
                        <>
                          {(() => {
                            const addressParts = []
                            if (props.data.purchaseOrder.profileAddress.country) {
                              addressParts.push(props.data.purchaseOrder.profileAddress.country)
                            }
                            if (props.data.purchaseOrder.profileAddress.zone) {
                              addressParts.push(`zone: ${props.data.purchaseOrder.profileAddress.zone}`)
                            }
                            if (props.data.purchaseOrder.profileAddress.street) {
                              addressParts.push(`street: ${props.data.purchaseOrder.profileAddress.street}`)
                            }
                            if (props.data.purchaseOrder.profileAddress.building) {
                              addressParts.push(`building: ${props.data.purchaseOrder.profileAddress.building}`)
                            }

                            return `(${addressParts.join(', ')})`
                          })()}
                          {props.data.purchaseOrder.profileAddress && props.data.purchaseOrder.profileAddress.lat && props.data.purchaseOrder.profileAddress.lng && (
                              <button
                                  onClick={openMap}
                                  style={{
                                    marginLeft: '2%',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                              >
                          <span role="img" aria-label="earth">
                            🌐
                          </span>
                              </button>
                          )}
                        </>
                    ) : null}
                  </CardText>
                </div>
              </CardBody>
            </div>
            {/* Invoice Description */}
            <Table responsive>
              <thead>
              <tr>
                <th className="py-1">Product Name</th>
                <th className="py-1">Product Detail</th>
                <th className="py-1">Price</th>
                <th className="py-1">Quantity</th>
                <th className="py-1">Total</th>
              </tr>
              </thead>
              <tbody>
              {Object.values(groupedProducts).length > 0 ? (
                  Object.values(groupedProducts).map((items) => items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-1"
                                style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                              <p className="card-text font-weight-bold mb-25">{item.productDetails.products.name}</p>
                            </td>
                            <td className="py-1">
                              <p className="card-text">
                                {item.productDetails && item.productDetails.description
                                    ? (() => {
                                      const words = item.productDetails.description.split(' ')
                                      const maxWords = 10
                                      if (words.length > maxWords) {
                                        return (
                                            <>
                                              {words.slice(0, maxWords).join(' ')}
                                              <br/>
                                              {words.slice(maxWords).join(' ')}
                                            </>
                                        )
                                      } else {
                                        return item.productDetails.description
                                      }
                                    })()
                                    : 'No description available'}
                              </p>
                            </td>
                            <td className="py-1">
                              <span className="font-weight-bold">${item.price}</span>
                            </td>
                            <td className="py-1">
                              <span className="font-weight-bold">{item.quantity}</span>
                            </td>
                            <td className="py-1">
                              <span className="font-weight-bold">${item.price * item.quantity}</span>
                            </td>
                          </tr>
                      ))
                  )
              ) : (
                  <tr>
                    <td colSpan="4">No purchase orders found.</td>
                  </tr>
              )}
              </tbody>
            </Table>
            {/* /Invoice Description */}

          </Card>


          <ModalFooter className='justify-content-center'>
            <Button.Ripple
                type='button'
                className='flex-grow-1'
                color='danger'
                onClick={_close}
                style={{maxWidth: '25%', width: '25%'}}

            >
              <span>{'Close'}</span>
            </Button.Ripple>
          </ModalFooter>

        </Form>
      </Modal>
  )
}

export default BasicInfoModal

