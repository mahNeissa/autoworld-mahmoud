// This component creates a modal (pop-up) form that allows users to either add or edit basic information, likely for an admin or category. It leverages React, React Hook Form for form management, Redux for state management, and Reactstrap for UI components.
import React, {useState} from 'react' //Core React library for creating components and managing state.
import classnames from 'classnames' //A utility to conditionally join class names.
import {Controller, useForm} from 'react-hook-form' //React Hook Form library for managing form state, validation, and submission.
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
  InputGroupAddon, InputGroup, InputGroupText, Col
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'

import {
  _addAdmin, _addCarSell,
  _editAdminInfo, _editCarSell,
  _editCategory,
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
  //const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})

  const _close = () => {
    //setOpen(false) // Set open to false
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    data.isActive = data.isActive.value
    if (isEditAction) {
      _editCarSell(
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
      _addCarSell(
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
    <Modal //This is the primary element that creates the modal (pop-up) window.
      isOpen={props.isOpen} // isOpen value is being passed into this component from its parent component. If props.isOpen is true, the modal shows; if it's false, it hides.
      toggle={props.onClose} // This specifies the function that's executed when the modal is closed.
      unmountOnClose={true}//This means that when the modal is closed, it's completely removed from the website's structure (DOM).
      backdrop={true}//This creates a dark overlay behind the modal, making the modal stand out.
      className='sidebar-lg'
      contentClassName='p-0'
      modalClassName='modal-slide-in sidebar-todo-modal'
    >
      <Form action='/public' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
       {/*action='/public' : This sets the URL where the form data will be sent when the form is submitted.*/}
       {/* flex-grow-1: Allows the form to expand and fill available space.*/}
       {/* d-flex: Enables flexbox layout.*/}
       {/* flex-column: Arranges the form's child elements in a vertical column.*/}
       {/* handleSubmit is a function from a form that validates the form data.*/}
        <ModalHeader toggle={_close} className='mb-1'>
          {trans(isEditAction ? 'user.actions.editCarSell' : 'user.actions.addCarSell')}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>

          <FormGroup>
            <Label className='form-label' for='brands.name'>
              {'Brand Name'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='brands.name'
                name='brands.name'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.brands.name') ?? ''}
                className={classnames({ 'is-invalid': errors['brands.name'] || _.get(valErrors, 'brands.name') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'brands.name'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='carModels.name'>
              {'Model'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='carModels.name'
                name='carModels.name'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.carModels.name') ?? ''}
                className={classnames({ 'is-invalid': errors['carModels.name'] || _.get(valErrors, 'carModels.name') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'carModels.name'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='type'>
              {'Type'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='type'
                name='type'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.type') ?? ''}
                className={classnames({ 'is-invalid': errors['type'] || _.get(valErrors, 'type') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'type'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='user.name'>
              {'Owner'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='user.name'
                name='user.name'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.user.name') ?? ''}
                className={classnames({ 'is-invalid': errors['user.name'] || _.get(valErrors, 'user.name') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'user.name'} />
          </FormGroup>
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
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'serial'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='isPaid'>
              {'Is Paid'}
            </Label>
            <Controller
              as={Select}
              control={control}
              type='text'
              id='isPaid'
              name='isPaid'
              rules={{
                required: trans('user.validation.required')
              }}
              options={isActiveOptions}
              defaultValue={_.get(props, 'data.isPaid') ? isActiveOptions[0] : isActiveOptions[1]}
              className={classnames({ 'is-invalid': errors['isPaid'] || _.get(valErrors, 'isPaid') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'isPaid'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='price'>
              {'Price'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='price'
                name='price'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.price') ?? ''}
                className={classnames({ 'is-invalid': errors['price'] || _.get(valErrors, 'price') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'price'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='status'>
              {'Status'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='status'
                name='status'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.status') ?? ''}
                className={classnames({ 'is-invalid': errors['status'] || _.get(valErrors, 'status') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'status'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='insertDate'>
              {'InsertDate'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='insertDate'
                name='insertDate'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.insertDate') ?? ''}
                className={classnames({ 'is-invalid': errors['insertDate'] || _.get(valErrors, 'insertDate') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'insertDate'} />
          </FormGroup>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>
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

export default BasicInfoModal

