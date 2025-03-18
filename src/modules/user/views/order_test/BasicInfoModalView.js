import React, {useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
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
  Col
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'

import {
  _addAdmin, _addOrder,
  _editAdminInfo,
  _editCategory, _editOrder,
  _getAllResponsiblesWithQ,
  _getAllRolesWithQ
} from "../../redux/actions"
import AsyncSelect from "react-select/async"

const submitDataStructure = {
  id: 0,
  name: "string",
  summary: "string",
  order: 0,
  isActive: true
}

const isActiveOptions = [
  {label: trans('user.yes'), value: true},
  {label: trans('user.no'), value: false}
]

const BasicInfoModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control } = useForm()
  // const isEditAction = _.size(`${props.data.id}`) > 0
  const isEditAction = !!props.data?.id
  console.log("Received viewOnly in BasicInfoModal:", props.viewOnly)

  const isViewAction = props.viewOnly // Added prop for view-only mode
  console.log("isViewAction:", isViewAction) // Add this line

  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    data.isActive = data.isActive.value
    if (isEditAction) {
      _editOrder(
        {...props.data, ...data},
        () => {
          props.successCallback()
          _close()
        },
        (err) => {
          if (err) {
            const arr = {}
            for (const f in err) {
              if (err[f] !== null) arr[f] = err[f][0]
            }
            setValErrors(arr)
          }
        }
      )
    } else {
      _addOrder(
        data,
        () => {
          props.successCallback()
          _close()
        },
        (err) => {
          if (err) {
            const arr = {}
            for (const f in err) {
              if (err[f] !== null) arr[f] = err[f][0]
            }
            setValErrors(arr)
          }
        }
      )
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
      style={{ maxWidth: '90%', width: '90%' }}

    >
      <Form action='/public' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className="mb-1">
          {trans(isViewAction ? 'gen.actions.view' : isEditAction ? 'user.actions.editOrder' : 'user.actions.addOrder')}
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
                  rules={{
                    required: trans('user.validation.required')
                  }}
                  defaultValue={_.get(props, 'data.serial') ?? ''}
                  className={classnames({ 'is-invalid': errors['serial'] || _.get(valErrors, 'serial') })}
                  disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'name'} />
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
                  rules={{
                    // required: trans('user.validation.required')
                  }}
                  defaultValue={_.get(props, 'data.user.name') ?? ''}
                  className={classnames({ 'is-invalid': errors['name'] || _.get(valErrors, 'name') })}
                  disabled={isViewAction} // Disable if view-only

                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'name'} />
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
                    rules={{
                      required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.carName') ?? ''}
                    className={classnames({ 'is-invalid': errors['carName'] || _.get(valErrors, 'carName') })}
                    disabled={isViewAction} // Disable if view-only
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'carName'} />
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
                    rules={{
                      // required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.carModel') ?? ''}
                    className={classnames({ 'is-invalid': errors['carModel'] || _.get(valErrors, 'carModel') })}
                    disabled={isViewAction} // Disable if view-only
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'carModel'} />
              </FormGroup>
            </Col>

          </Row>


        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple type='submit' className='flex-grow-1' color='primary'     disabled={loading || isViewAction} // Prevents submission in view mode
          >
            { loading ? <ButtonSpinner/> : null}
            <span>{trans('gen.actions.save')}</span>
          </Button.Ripple>
          <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>
            <span>{trans('gen.actions.cancel')}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

// export default BasicInfoModal

