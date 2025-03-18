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
  _addAdmin, _addCarModel,
  _editAdminInfo, _editCarModel,
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
      _editCarModel(
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
      _addCarModel(
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
          {trans(isEditAction ? 'user.actions.editCarModel' : 'user.actions.addCarModel')}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>

          <FormGroup>
            <Label className='form-label' for='name'>
              {'Brand Name'}
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='name'
              name='name'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.name') ?? ''}
              className={classnames({ 'is-invalid': errors['name'] || _.get(valErrors, 'name') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'name'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='brandsCountry.name'>
              {'Country'}
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='brandsCountry.name'
              name='Country'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.brandsCountry.name') ?? ''}
              className={classnames({ 'is-invalid': errors['brandsCountry.name'] || _.get(valErrors, 'brandsCountry.name') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'country'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='logo'>
              {'Logo'}
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='logo'
              name='Logo'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.logo') ?? ''}
              className={classnames({ 'is-invalid': errors['logo'] || _.get(valErrors, 'logo') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'logo'} />
          </FormGroup>

          <FormGroup>
            <Label className='form-label' for='order'>
              {'Order'}
            </Label>
            <Controller
                as={Input}
                control={control}
                type='text'
                id='order'
                name='Order'
                rules={{
                  required: trans('user.validation.required')
                }}
                defaultValue={_.get(props, 'data.order') ?? ''}
                className={classnames({ 'is-invalid': errors['order'] || _.get(valErrors, 'order') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'logo'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='isActive'>
              {trans('user.isActive')}
            </Label>
            <Controller
              as={Select}
              control={control}
              type='text'
              id='isActive'
              name='isActive'
              rules={{
                required: trans('user.validation.required')
              }}
              options={isActiveOptions}
              defaultValue={_.get(props, 'data.isActive') ? isActiveOptions[0] : isActiveOptions[1]}
              className={classnames({ 'is-invalid': errors['isActive'] || _.get(valErrors, 'isActive') })}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'isActive'} />
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

