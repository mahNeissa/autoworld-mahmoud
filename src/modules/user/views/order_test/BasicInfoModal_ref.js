import React, {useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText, MoreVertical, Send, Plus, Key, User, Eye, Trash} from 'react-feather'

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

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
const ImageDisplay = ({ imagePath }) => {
  return (
      <div style={{ marginTop: '10px' }}>
        {imagePath ? (
            <img
                src={imagePath}
                alt="User Image"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
        ) : (
            <img
                src={defaultUserIcon} // Use the imported image path
                alt="Default User Icon"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
        )}
      </div>
  )
}
const BasicInfoModal = (props) => {
  const loading = useSelector(state => state.app.loading)
  const { errors, control } = useForm()
  console.log("Received viewOnly in BasicInfoModal:", props.viewOnly)

  const isViewAction = true //props.viewOnly // Added prop for view-only mode
  console.log("isViewAction:", isViewAction) // Add this line

  const [open, setOpen] = useState(true)

  const _close = () => {
    setOpen(false)
    props.onClose()
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
      style={{ maxWidth: '90%', width: '90%' }}

    >
      <Form className='flex-grow-1 d-flex flex-column' >
        <ModalHeader toggle={_close} className="mb-1">
          <span style={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '24px', // Adjust the font size as needed
            textAlign:'center'
          }}>
              {'View Details'}
          </span>

        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          {/*first row*/}
          <Row>
            <Col md="3">
              <FormGroup>
                <Label className='form-label' for='serial'>
                  {'Serial'}
                </Label>
                <Controller
                  as={Input}
                  control={control}
                  type='text'
                  id='serial'
                  name='serial'
                  defaultValue={_.get(props, 'data.serial') ?? ''}
                  className={classnames({ 'is-invalid': errors['serial']})}
                  disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages errors={errors} name={'name'} />
              </FormGroup>
            </Col>
            <Col md="3">
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
                  className={classnames({ 'is-invalid': errors['name']  })}
                  disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages errors={errors} name={'name'} />
              </FormGroup>
            </Col>
            <Col md="3">
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
            <Col md="3">
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
          <Row>
            <Col md="3">
              <FormGroup>
                <Label className='form-label' for='status'>
                  {'Status'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='status'
                    name='Status'
                    defaultValue={_.get(props, 'data.status') ?? ''}
                    className={classnames({ 'is-invalid': errors['status'] })}
                    disabled={isViewAction}
                />
                <ErrorMessages errors={errors} name={'status'} />
              </FormGroup>
            </Col>
            <Col md="3">
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
            <Col md="3">
              <FormGroup>
                <Label className='form-label' for='remarks'>
                  {'Remarks'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='remarks'
                    name='remarks'
                    defaultValue={_.get(props, 'data.remarks') ?? ''}
                    className={classnames({ 'is-invalid': errors['remarks'] })}
                    disabled={isViewAction}
                />
                <ErrorMessages errors={errors} name={'remarks'} />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label className='form-label' for='insertDate'>
                  {'Insert Date'}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='insertDate'
                    name='Insert Date'
                    defaultValue={_.get(props, 'data.insertDate') ?? ''}
                    className={classnames({ 'is-invalid': errors['insertDate'] })}
                    disabled={isViewAction}
                />
                <ErrorMessages errors={errors} name={'insertDate'} />
              </FormGroup>
            </Col>
          </Row>
          <Table bordered style={{ marginTop: '20px' }}>
            <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Reply Date</th>
              <th>Offer Price</th>
              <th>Supplier Notes</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{_.get(props, 'data.orderSuppliers[0].supplierId')}</td>
              <td>{_.get(props, 'data.orderSuppliers[0].supplier.fullName')}</td>
              <td>{_.get(props, 'data.carName')}</td>
              <td>{_.get(props, 'data.carModel')}</td>
            </tr>
            </tbody>
          </Table>
          {/*/!*Third row*!/*/}
          {/*<Row>*/}
          {/*    <Col md="3">*/}
          {/*      <FormGroup>*/}
          {/*        <Label className='form-label' for='data.orderSuppliers[0].supplierNotes'>*/}
          {/*          {'Supplier Notes'}*/}
          {/*        </Label>*/}
          {/*        <Controller*/}
          {/*            as={Input}*/}
          {/*            control={control}*/}
          {/*            type='text'*/}
          {/*            id='supplierNotes'*/}
          {/*            name='Supplier Notes'*/}
          {/*            defaultValue={_.get(props, 'data.orderSuppliers[0].supplierNotes') ?? ''}*/}
          {/*            className={classnames({ 'is-invalid': errors['supplierNotes'] })}*/}
          {/*            disabled={isViewAction} // Disable if view-only*/}

          {/*        />*/}
          {/*        <ErrorMessages errors={errors} name={'supplierNotes'} />*/}
          {/*      </FormGroup>*/}
          {/*    </Col>*/}
          {/*    <Col md="3">*/}
          {/*        <FormGroup>*/}
          {/*          <Label className='form-label' for='data.orderSuppliers[0].status'>*/}
          {/*            {'Order Supplier Status'}*/}
          {/*          </Label>*/}
          {/*          <Controller*/}
          {/*              as={Input}*/}
          {/*              control={control}*/}
          {/*              type='text'*/}
          {/*              id='status'*/}
          {/*              name='Order Supplier Status'*/}
          {/*              defaultValue={_.get(props, 'data.orderSuppliers[0].status') ?? ''}*/}
          {/*              className={classnames({ 'is-invalid': errors['orderSuppliers[0].status'] })}*/}
          {/*              disabled={isViewAction} // Disable if view-only*/}
          {/*          />*/}
          {/*          <ErrorMessages errors={errors} name={'orderSuppliers[0].status'} />*/}
          {/*        </FormGroup>*/}
          {/*    </Col>*/}
          {/*  <Col md="3">*/}
          {/*      <FormGroup>*/}
          {/*        <Label className='form-label' for='data.orderSuppliers[0].replyDate'>*/}
          {/*          {'Reply Date'}*/}
          {/*        </Label>*/}
          {/*        <Controller*/}
          {/*            as={Input}*/}
          {/*            control={control}*/}
          {/*            type='text'*/}
          {/*            id='data.orderSuppliers[0].replyDate'*/}
          {/*            name='Reply Date'*/}
          {/*            defaultValue={_.get(props, 'data.orderSuppliers[0].replyDate') ?? ''}*/}
          {/*            className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].replyDate'] })}*/}
          {/*            disabled={isViewAction}*/}
          {/*        />*/}
          {/*        <ErrorMessages errors={errors} name={'data.orderSuppliers[0].replyDate'} />*/}
          {/*      </FormGroup>*/}
          {/*  </Col>*/}
          {/*  <Col md="3">*/}
          {/*    <FormGroup>*/}
          {/*      <Label className='form-label' for='data.orderSuppliers[0].isWinner'>*/}
          {/*        {'Is winner'}*/}
          {/*      </Label>*/}
          {/*      <Controller*/}
          {/*          as={Input}*/}
          {/*          control={control}*/}
          {/*          type='text'*/}
          {/*          id='data.orderSuppliers[0].isWinner'*/}
          {/*          name='Is Winner'*/}
          {/*          defaultValue={_.get(props, 'data.orderSuppliers[0].isWinner') ?? ''}*/}
          {/*          className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].isWinner'] })}*/}
          {/*          disabled={isViewAction}*/}
          {/*      />*/}
          {/*      <ErrorMessages errors={errors} name={'data.orderSuppliers[0].isWinner'} />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*/!*Fourth row*!/*/}
          {/*<Row>*/}
          {/*  <Col md="3">*/}
          {/*    <FormGroup>*/}
          {/*      <Label className='form-label' for='data.orderSuppliers[0].supplier.fullName'>*/}
          {/*        {'Supplier Full Name'}*/}
          {/*      </Label>*/}
          {/*      <Controller*/}
          {/*          as={Input}*/}
          {/*          control={control}*/}
          {/*          type='text'*/}
          {/*          id='data.orderSuppliers[0].supplier.fullName'*/}
          {/*          name='Supplier Full Name'*/}
          {/*          defaultValue={_.get(props, 'data.orderSuppliers[0].supplier.fullName') ?? ''}*/}
          {/*          className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].supplier.fullName'] })}*/}
          {/*          disabled={isViewAction} // Disable if view-only*/}

          {/*      />*/}
          {/*      <ErrorMessages errors={errors} name={'data.orderSuppliers[0].supplier.fullName'} />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*  <Col md="3">*/}
          {/*    <FormGroup>*/}
          {/*      <Label className='form-label' for='data.orderSuppliers[0].supplier.user.mobile'>*/}
          {/*        {'Supplier Mobile'}*/}
          {/*      </Label>*/}
          {/*      <Controller*/}
          {/*          as={Input}*/}
          {/*          control={control}*/}
          {/*          type='text'*/}
          {/*          id='data.orderSuppliers[0].supplier.user.mobile'*/}
          {/*          name='Supplier Mobile'*/}
          {/*          defaultValue={_.get(props, 'data.orderSuppliers[0].supplier.user.mobile') ?? ''}*/}
          {/*          className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].supplier.user.mobile'] })}*/}
          {/*          disabled={isViewAction} // Disable if view-only*/}
          {/*      />*/}
          {/*      <ErrorMessages errors={errors} name={'data.orderSuppliers[0].supplier.user.mobile'} />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*  <Col md="3">*/}
          {/*    <FormGroup>*/}
          {/*      <Label className='form-label' for='data.orderSuppliers[0].supplier.user.email'>*/}
          {/*        {'Supplier Email'}*/}
          {/*      </Label>*/}
          {/*      <Controller*/}
          {/*          as={Input}*/}
          {/*          control={control}*/}
          {/*          type='text'*/}
          {/*          id='data.orderSuppliers[0].supplier.user.email'*/}
          {/*          name='Supplier Email'*/}
          {/*          defaultValue={_.get(props, 'data.orderSuppliers[0].supplier.user.email') ?? ''}*/}
          {/*          className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].supplier.user.email']  })}*/}
          {/*          disabled={true}*/}
          {/*      />*/}
          {/*      <ErrorMessages errors={errors} name={'data.orderSuppliers[0].supplier.user.email'} />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*  <Col md="3">*/}
          {/*    <FormGroup>*/}
          {/*      <Label className='form-label' for='data.orderSuppliers[0].supplier.user.imagePath'>*/}
          {/*        {'Image Path'}*/}
          {/*      </Label>*/}
          {/*      <Controller*/}
          {/*          as={Input}*/}
          {/*          control={control}*/}
          {/*          type='text'*/}
          {/*          id='data.orderSuppliers[0].supplier.user.imagePath'*/}
          {/*          name='Image Path'*/}
          {/*          defaultValue={_.get(props, 'data.orderSuppliers[0].supplier.user.imagePath') ?? ''}*/}
          {/*          className={classnames({ 'is-invalid': errors['data.orderSuppliers[0].supplier.user.imagePath']  })}*/}
          {/*          disabled={isViewAction}*/}
          {/*      />*/}
          {/*      <ErrorMessages errors={errors} name={'data.orderSuppliers[0].supplier.user.imagePath'} />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' htmlFor='data.orderSuppliers[0].supplier.user.imagePath'>
                  {'User Profile'}
                </Label>
                <div style={{marginTop: '0px'}}>
                  {_.get(props, 'data.orderSuppliers[0].supplier.user.imagePath') ? (
                      <img
                          src={_.get(props, 'data.orderSuppliers[0].supplier.user.imagePath')}
                          alt="User Image"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  ) : (
                      <img
                          src={defaultUserIcon}
                          alt="Default User Icon"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' htmlFor='firstAttachment'>
                  {'First Image'}
                </Label>
                <div style={{marginTop: '0px'}}>
                  {_.get(props, 'data.firstAttachment') ? (
                      <img
                          src={_.get(props, 'data.firstAttachment')}
                          alt="First Image"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  ) : (
                      <img
                          src={defaultUserIcon}
                          alt="Default User Icon"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label className='form-label' htmlFor='secondAttachment'>
                  {'Second Image'}
                </Label>
                <div style={{marginTop: '0px'}}>
                  {_.get(props, 'data.secondAttachment') ? (
                      <img
                          src={_.get(props, 'data.secondAttachment')}
                          alt="Second Image"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  ) : (
                      <img
                          src={defaultUserIcon}
                          alt="Default User Icon"
                          style={{maxWidth: '100px', maxHeight: '100px'}}
                      />
                  )}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple
              type='button'
              className='flex-grow-1'
              color='danger'
              // Removed loading from disable
              // disabled={loading}
              onClick={_close}
              style={{ maxWidth: '25%', width: '25%' }}

          >
            <span>{'Close'}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default BasicInfoModal

