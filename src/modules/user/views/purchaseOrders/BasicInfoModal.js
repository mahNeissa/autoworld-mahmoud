import React, {useState, useMemo} from 'react'
import { useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import 'cleave.js/dist/addons/cleave-phone.us'
import 'react-photo-view/dist/react-photo-view.css'
import {
  Button,
  Form,
  Modal,
  ModalFooter,
  Table,
  Card, CardBody, CardText
} from 'reactstrap'
import _ from "lodash"
import StatusStepper from "../../../../components/StatusStepper" // Import StatusStepper


const BasicInfoModal = (props) => {
  const [open, setOpen] = useState(true)

  const _close = () => {
    setOpen(false)
    props.onClose()
  }
  const openMap = () => {
    if (props.data[0].purchaseOrder.profileAddress && props.data[0].purchaseOrder.profileAddress.lat && props.data[0].purchaseOrder.profileAddress.lng) {
      const { lat, lng } = props.data[0].purchaseOrder.profileAddress
      const mapUrl = `http://maps.google.com/maps?q=${lat},${lng}` // Corrected Google Maps URL
      window.open(mapUrl, '_blank') // Open in a new tab
    }
  }
  // StatusStepper Logic
  const orderStatusValue = parseInt(_.get(props.data[0], 'status')) // Corrected here
  const currentStep = orderStatusValue !== undefined ? orderStatusValue : 0
  const statusSteps = [
    { label: "New", name: "New", content: <></>},
    { label: "Reply", name: "Reply", content: <></> },
    { label: "Selected", name: "Selected", content: <></> },
    { label: "Ordered", name: "Ordered", content: <></> },
    { label: "Packaging", name: "Packaging", content: <></> },
    { label: "Sent", name: "Sent", content: <></> },
    { label: "Finished", name: "Finished", content: <></> }
  ]
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
                    Serial: <strong>{props.data[0].purchaseOrder.serial}</strong>
                  </CardText>
                </div>
                <div>
                  <CardText className="mb-25" style={{ color: '#5E5873', textAlign: 'right' }}>
                    Date Issued:{" "}
                    <strong>
                      {props.data[0].purchaseOrder.insertDate
                          ? (() => {
                            const date = new Date(props.data[0].purchaseOrder.insertDate)
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
                    <strong style={{marginRight:'2%'}}>{props.data[0].purchaseOrder.user.name}</strong>
                  </CardText>
                  <CardText className='mb-25' style={{fontStyle: 'italic', whiteSpace: 'nowrap'}}>Mobile:
                    <strong style={{marginRight:'2%'}}>{props.data[0].purchaseOrder.user.mobile}</strong>
                  </CardText>
                  <CardText className='mb-25' style={{fontStyle: 'italic', whiteSpace: 'nowrap'}}>Address:
                    {props.data[0].purchaseOrder.profileAddress ? (
                        <>
                          {(() => {
                            const addressParts = []
                            if (props.data[0].purchaseOrder.profileAddress.country) {
                              addressParts.push(props.data[0].purchaseOrder.profileAddress.country)
                            }
                            if (props.data[0].purchaseOrder.profileAddress.zone) {
                              addressParts.push(`zone: ${props.data[0].purchaseOrder.profileAddress.zone}`)
                            }
                            if (props.data[0].purchaseOrder.profileAddress.street) {
                              addressParts.push(`street: ${props.data[0].purchaseOrder.profileAddress.street}`)
                            }
                            if (props.data[0].purchaseOrder.profileAddress.building) {
                              addressParts.push(`building: ${props.data[0].purchaseOrder.profileAddress.building}`)
                            }

                            return `(${addressParts.join(', ')})`
                          })()}
                          {props.data[0].purchaseOrder.profileAddress && props.data[0].purchaseOrder.profileAddress.lat && props.data[0].purchaseOrder.profileAddress.lng && (
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
                  {props.data.map(item => ( // direct map of props.data
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
                  ))}

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

