import React, {useState} from 'react'
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
  Table
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'
import defaultUserIcon from '../../assets/images/no-image.jpg'
import pdfIcon from '../../assets/images/PDF.jpg' // Replace with your PDF icon path

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'


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

  const openPdfViewer = (url) => {
    setPdfUrl(url)
    setPdfViewerOpen(true)
  }

  const closePdfViewer = () => {
    setPdfUrl(null)
    setPdfViewerOpen(false)
  }
  const renderAttachment = (attachment) => {
    if (!attachment) {
      return (
          <div style={{ width: '50%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PhotoView src={defaultUserIcon}>
                <img
                    src={defaultUserIcon}
                    alt="Default User Icon"
                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'cover', borderRadius: '20%', marginTop:'5%' }}
                />
              </PhotoView>
          </div>
      )
    }

    if (attachment.toLowerCase().endsWith('.pdf')) {
      return (

            <img
                src={pdfIcon} // Use the PDF icon
                alt="PDF Attachment"
                className="img-fluid"
                onClick={() => openPdfViewer(attachment)}
            />

      )
    } else {
      return (
      <PhotoView src={attachment}>
        <img
            src={attachment}
            alt="Attachment"
            className="img-fluid"
        />
      </PhotoView>
      )
    }
  }
  const renderAttachmentIcon = (attachment) => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', objectFit: 'fill', justifyContent: 'center', alignItems: 'center' }}>
          {attachment ? (
              <PhotoView src={attachment}>
                <img
                    src={attachment}
                    alt="Attachment"
                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'cover', borderRadius: '20%', marginTop:'5%' }}
                />
              </PhotoView>
          ) : (
              <div style={{ width: '80%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Optional: Placeholder or empty div */}
              </div>
          )}
        </div>
    )
  }
  const openMap = () => {
    if (props.data.profileAddress && props.data.profileAddress.lat && props.data.profileAddress.lng) {
      const { lat, lng } = props.data.profileAddress
      const mapUrl = `http://maps.google.com/maps?q=${lat},${lng}` // Corrected Google Maps URL
      window.open(mapUrl, '_blank') // Open in a new tab
    }
  }
  return (
    <Modal
      isOpen={open}
      toggle={_close}
      unmountOnClose={true}
      backdrop={true}
      className='sidebar-lg'
      contentClassName='p-0'
      modalClassName='modal-slide-in sidebar-todo-modal'
      style={{ maxWidth: '100%', width: '100%' }}

    >
      <Form className='flex-grow-1 d-flex flex-column' >
        <ModalHeader toggle={_close} className="mb-1">
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <div style={{whiteSpace: 'nowrap'}}>
              <strong style={{marginRight: '5%'}}>Serial:</strong> {_.get(props, 'data.serial')}
              <strong style={{marginLeft: '35%', marginRight: '2%'}}>Insert
                Date:</strong>
              {/*{_.get(props, 'data.insertDate')}*/}
              {props.data.insertDate
                  ? (() => {
                    const date = new Date(props.data.orderSuppliers[0].replyDate)
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    const hours = String(date.getHours()).padStart(2, '0')
                    const minutes = String(date.getMinutes()).padStart(2, '0')
                    return `${year}-${month}-${day} ${hours}:${minutes}`
                  })()
                  : 'N/A'}
            </div>
            <div style={{marginLeft: '35%', whiteSpace: 'nowrap'}}>
              <strong style={{marginRight: '2%'}}>Status:</strong>
              {(() => {
                const orderstatus = parseInt(_.get(props, 'data.status'))
                const statusObject = OrderStatus[orderstatus]
                return statusObject ? statusObject.value : 'Status Not Found' // Removed CustomBadgeInput
              })()}
            </div>
            <div style={{whiteSpace: 'nowrap'}}>
              {props.data.profileAddress ? (
                  <>
                    <strong style={{ marginLeft: '35%', marginRight: '2%' }}>
                      Address:
                    </strong>
                    {(() => {
                      const addressParts = []
                      if (props.data.profileAddress.country) {
                        addressParts.push(props.data.profileAddress.country)
                      }
                      if (props.data.profileAddress.zone) {
                        addressParts.push(`zone: ${props.data.profileAddress.zone}`)
                      }
                      if (props.data.profileAddress.street) {
                        addressParts.push(`street: ${props.data.profileAddress.street}`)
                      }
                      if (props.data.profileAddress.building) {
                        addressParts.push(`building: ${props.data.profileAddress.building}`)
                      }

                      return `(${addressParts.join(', ')})`
                    })()}
                    {props.data.profileAddress && props.data.profileAddress.lat && props.data.profileAddress.lng && (
                        <button
                            onClick={openMap}
                            style={{
                              marginLeft: '2%',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                        >
                          <span role="img" aria-label="map">
                            🗺️
                          </span>
                        </button>
                    )}
                  </>
              ) : null}

                </div>
          </div>
        </ModalHeader>


        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          {/*First row*/}
          <Row>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='user.name'>
                  {'Name'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='user.name'
                    name='name'

                    defaultValue={_.get(props, 'data.user.name') ?? ''}
                    className={classnames({'is-invalid': errors['name']})}
                    disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages errors={errors} name={'name'}/>
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='user.email'>
                  {'Email'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='user.email'
                    name='email'

                    defaultValue={_.get(props, 'data.user.email') ?? ''}
                    className={classnames({ 'is-invalid': errors['email']  })}
                    disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages errors={errors} name={'email'} />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='user.mobile'>
                  {'Mobile'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='user.mobile'
                    name='mobile'

                    defaultValue={_.get(props, 'data.user.mobile') ?? ''}
                    className={classnames({ 'is-invalid': errors['mobile']  })}
                    disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages errors={errors} name={'mobile'} />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='vinNumber'>
                  {'Vin Number'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='vinNumber'
                    name='vinNumber'
                    defaultValue={_.get(props, 'data.vinNumber') ?? ''}
                    className={classnames({ 'is-invalid': errors['vinNumber'] })}
                    disabled={isViewAction} // Disable if view-only
                />
                <ErrorMessages errors={errors} name={'vinNumber'} />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='carName'>
                  {'Car Name'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='carName'
                    name='carName'
                    defaultValue={_.get(props, 'data.carName') ?? ''}
                    className={classnames({ 'is-invalid': errors['carName']  })}
                    disabled={isViewAction} // Disable if view-only
                />
                <ErrorMessages errors={errors} name={'carName'} />
              </FormGroup>

            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' for='carModel'>
                  {'Car Model'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='carModel'
                    name='carModel'
                    defaultValue={_.get(props, 'data.carModel') ?? ''}
                    className={classnames({ 'is-invalid': errors['carModel'] })}
                    disabled={isViewAction} // Disable if view-only
                />
                <ErrorMessages errors={errors} name={'carModel'} />
              </FormGroup>
            </Col>

          </Row>
          {/*Second Row*/}
            {/* Left Half: Form Fields */}
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" for="remarks">
                    {'Remarks'}
                  </Label>
                  <Controller
                      as={<Input type="textarea" rows="4" />}
                      control={control}
                      id="remarks"
                      name="remarks"
                      defaultValue={_.get(props, 'data.remarks') ?? ''}
                      className={classnames({ 'is-invalid': errors['remarks'] })}
                      disabled={isViewAction}
                  />
                  <ErrorMessages errors={errors} name={'remarks'} />
                </FormGroup>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="12">
                    <strong style={{marginRight: '2%'}}>Attachments</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                  <PhotoProvider>

                    {renderAttachment(
                        _.get(props, 'data.firstAttachment')
                    )}
                  </PhotoProvider>
                  </Col>
                  <Col md="2">
                    <PhotoProvider>

                      {renderAttachment(
                          _.get(props, 'data.secondAttachment')
                      )}
                    </PhotoProvider>

                  </Col>
                  <Col md="2">
                    <PhotoProvider>

                      {renderAttachment(
                          _.get(props, 'data.thirdAttachment')
                      )}
                    </PhotoProvider>

                  </Col>
                  <Col md="2">
                    <PhotoProvider>

                      {renderAttachment(
                          _.get(props, 'data.fourthAttachment')
                      )}
                    </PhotoProvider>

                  </Col>
                  <Col md="2">
                    <PhotoProvider>

                      {renderAttachment(
                          _.get(props, 'data.fifthAttachment')
                      )}
                    </PhotoProvider>

                  </Col>
                  <Col md="2">
                    <PhotoProvider>

                      {renderAttachment(
                          _.get(props, 'data.sixthAttachment')
                      )}
                    </PhotoProvider>

                  </Col>
                </Row>

              </Col>
            </Row>

          <Table bordered style={{marginTop: '2%', tableLayout: 'auto'}}>
            <thead>
            <tr>
              <th style={{whiteSpace: 'nowrap'}}>Status</th>
              <th style={{whiteSpace: 'nowrap'}}>Supplier Name</th>
              <th style={{whiteSpace: 'nowrap'}}>Mobile</th>
              <th style={{whiteSpace: 'nowrap'}}>Email</th>
              <th style={{whiteSpace: 'nowrap'}}>Reply Date</th>
              <th style={{whiteSpace: 'nowrap'}}>Reply Attachment</th>

              <th style={{whiteSpace: 'nowrap'}}>Supplier Notes</th>
              <th style={{whiteSpace: 'nowrap'}}>Is Winner</th>

            </tr>
            </thead>
            <tbody>
            <tr>
              <td style={{ padding: '0px', width: '10%' }}>
                {props.data.orderSuppliers && props.data.orderSuppliers[0] && props.data.orderSuppliers[0].status
                    ? (() => {
                      const orderstatus = props.data.orderSuppliers[0].status
                      return OrderStatus[orderstatus].value
                    })()
                    : ''}
              </td>
              <td>{_.get(props, 'data.orderSuppliers[0].supplier.fullName')}</td>
              <td>{_.get(props, 'data.orderSuppliers[0].supplier.user.mobile')}</td>
              <td>{_.get(props, 'data.orderSuppliers[0].supplier.user.email')}</td>
              <td>
                {props.data.orderSuppliers && props.data.orderSuppliers[0] && props.data.orderSuppliers[0].replyDate
                    ? (() => {
                      const date = new Date(props.data.orderSuppliers[0].replyDate)
                      const year = date.getFullYear()
                      const month = String(date.getMonth() + 1).padStart(2, '0')
                      const day = String(date.getDate()).padStart(2, '0')
                      const hours = String(date.getHours()).padStart(2, '0')
                      const minutes = String(date.getMinutes()).padStart(2, '0')
                      return `${year}-${month}-${day} ${hours}:${minutes}`
                    })()
                    : 'N/A'}
              </td>
              <td>{

                  <PhotoProvider>
                    {renderAttachment(
                        _.get(props, 'data.orderSuppliers[0].replyAttachment')
                    )}
                  </PhotoProvider>

              }</td>
              <td style={{wordBreak: 'break-word'}}>{_.get(props, 'data.orderSuppliers[0].supplierNotes')}</td>
              {/* Added word-break and max-width */}

              <td>
                {props.data.orderSuppliers && props.data.orderSuppliers[0] && props.data.orderSuppliers[0].isWinner
                    ? (() => {
                      const isWinner = props.data.orderSuppliers[0].isWinner
                      const found = trueFaulse.find(item => item.key === isWinner)
                      return found ? found.value : null
                    })()
                    : ''}

              </td>
            </tr>
            </tbody>
          </Table>

        </ModalBody>
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
        <Modal isOpen={pdfViewerOpen} toggle={closePdfViewer} size="lg">
          <ModalHeader toggle={closePdfViewer}>
            {pdfUrl && pdfUrl.toLowerCase().endsWith('.pdf') ? 'PDF Viewer' : 'Image Viewer'}
          </ModalHeader>
          <ModalBody>
            {pdfUrl && (
                pdfUrl.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                        src={pdfUrl}
                        style={{ width: '100%', height: '100%' }}
                        title="PDF Viewer"
                    />
                ) : (
                    <PhotoProvider>
                      <PhotoView src={pdfUrl}>
                        <img
                            src={pdfUrl}
                            alt="Attachment"
                            style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
                        />
                      </PhotoView>
                    </PhotoProvider>
                )
            )}
          </ModalBody>
        </Modal>
      </Form>
    </Modal>
  )
}

export default BasicInfoModal

