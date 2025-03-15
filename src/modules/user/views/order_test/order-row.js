import React, {Fragment} from 'react'
import {Badge, Col, Container, Row, Button, ButtonGroup} from 'reactstrap'

import {_confirm} from '@utils'

import {ORDER_STATUS} from "./order-status"
import {_deleteDeliveryMethod as _deleteApi, _updateOrder} from "../../redux/actions"
import {randomModelImages} from "@csrc/components/file-manager/file-manager-with-modal"

const randomTexts = [
  "Laser Cutting Engraving Machine Laser Cutting Engraving Machine Laser Cutting Engraving Machine Laser Cutting Engraving Machine",
  "Accessories for CNC Router Machines Accessories for CNC Router Machines Accessories for CNC Router Machines Accessories for CNC Router Machines",
  "Laser Cutting Engraving Machine"
]

const getStatus = (orderProduct) => {
  return _.find(ORDER_STATUS, x => x.statusCategory === orderProduct.statusCategory && x.status === orderProduct.status)
}

const generateActions = (orderData, orderProduct, successCallback) => {
  let currentStatus = {}, nextStatus = {}, cancelStatus = {}
  currentStatus = _.find(ORDER_STATUS, x => x.statusCategory === orderProduct.statusCategory && x.status === orderProduct.status)
  if (currentStatus.nextStatusCategoryOnConfirm) {
    nextStatus = _.find(ORDER_STATUS, x => x.statusCategory === currentStatus.nextStatusCategoryOnConfirm && x.status === currentStatus.nextStatusOnConfirm)
  }
  if (currentStatus.nextStatusCategoryOnCancel) {
    cancelStatus = _.find(ORDER_STATUS, x => x.statusCategory === currentStatus.nextStatusCategoryOnCancel && x.status === currentStatus.nextStatusOnCancel)
  }

  return (
    <>
      <ButtonGroup size={'sm'}>
        {
          !_.isEmpty(nextStatus) && (
            <Button.Ripple color={'success'} title={nextStatus.label} size={'sm'} className={'btn-icon'} onClick={() => {
              _confirm({
                callback: (c) => {
                  _updateOrder(
                    {
                      id: orderData.id,
                      deliveryDate: orderData.deliveryDate,
                      isActive: true,
                      orderProducts: [
                        {
                          id: orderProduct.id,
                          statusCategory: nextStatus.statusCategory,
                          status: nextStatus.status
                        }
                      ]
                    },
                    () => {
                      successCallback()
                      c()
                    }
                  )
                }
              })
            }}>
              Confirm
            </Button.Ripple>
          )
        }
        {
          !_.isEmpty(cancelStatus) && (
            <Button.Ripple color={'danger'} title={cancelStatus.label} size={'sm'} className={'btn-icon'} onClick={() => {
              _confirm({
                callback: (c) => {
                  _updateOrder(
                    {
                      id: orderData.id,
                      deliveryDate: orderData.deliveryDate,
                      isActive: true,
                      orderProducts: [
                        {
                          id: orderProduct.id,
                          statusCategory: cancelStatus.statusCategory,
                          status: cancelStatus.status
                        }
                      ]
                    },
                    () => {
                      successCallback()
                      c()
                    }
                  )
                }
              })
            }}>
              Decline
            </Button.Ripple>
          )
        }
      </ButtonGroup>
    </>
  )
}

const OrderRow = props => {
  const {orderData, successCallback} = props
  return (
    <Container fluid>
      {
        _.map(orderData.orderProducts, (orderProduct, index) => {
          const randomItem = randomModelImages[Math.floor(Math.random() * randomModelImages.length)]
          const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)]
          const status = getStatus(orderProduct)
          return (
            <Fragment key={index}>
              {
                index > 0 && (
                  <hr />
                )
              }
              <Row>
                <Col className={'d-flex align-items-between'}>
                  <div className={'w-75 d-flex align-items-center'}>
                    <div className={'px-2 py-1 mr-3'}>
                      {/*<img width={100} height={100} src={orderProduct?.referenceObject?.modelURLImg}/>*/}
                      <img style={{borderRadius: 10}} width={100} height={100} src={randomItem} alt={''}/>
                    </div>
                    <div className={'d-flex flex-column flex-1 mr-2'}>
                      <div>
                        <Badge color={status.color} pill>{status.label}</Badge>
                      </div>
                      <h5 className={'mt-50'}>
                        {randomText}
                      </h5>
                    </div>
                  </div>
                  <div className={'w-25 d-flex flex-column align-items-center justify-content-center'}>
                    <div>
                      <h4 className={'font-weight-bolder'}>{orderProduct.quantity * orderProduct.price}</h4>
                    </div>
                    <div>
                      {generateActions(orderData, orderProduct, successCallback)}
                    </div>
                  </div>
                </Col>
              </Row>
            </Fragment>
          )
        })
      }
    </Container>
  )
}

OrderRow.propTypes = {}

export default OrderRow
