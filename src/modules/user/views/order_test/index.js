import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Eye, User, Trash} from 'react-feather'
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable, {ActionDropdownToggle} from '@src/components/datatable'
import {trans, _confirm, env} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import {_getDatatable} from "@csrc/utility/Utils"
import {CanCall} from '@authModule'
//************************************//
import {_deleteDeliveryMethod as _deleteApi} from '../../redux/actions'
import BasicInfoModal from './BasicInfoModal'
import OrderRow from "./order-row"
//************************************//
const tableColumns = (state, editModal, deleteAction, hasAction) => [
  {
    name: 'ID',
    selector: 'id',
    sortable: false,
    minWidth: '225px',
    omit: true,
    filter: {
      enabled: false
    }
  },
  {
    name: trans('user.name'),
    selector: 'name',
    sortable: false,
    grow: 1,
    // minWidth: '225px',
    filter: {
      enabled: false
    },
    cell: row => {
      return `${row.user.firstName} ${row.user.lastName}`
    }
  },
  {
    name: trans('wattsancnc.deliveryMethod'),
    selector: 'deliveryMethod.name',
    sortable: false,
    grow: 0,
    center: true,
    minWidth: '225px',
    filter: {
      enabled: false
    }
  },
  {
    name: trans('wattsancnc.cost'),
    sortable: false,
    grow: 0,
    center: true,
    minWidth: '225px',
    filter: {
      enabled: false
    },
    cell: row => {
      const mapped = _.map(row.orderProducts, x => x.price * x.quantity)
      return _.sum(mapped)
    }
  },
  {
    name: trans('wattsancnc.numberOfItems'),
    sortable: false,
    grow: 0,
    center: true,
    minWidth: '225px',
    filter: {
      enabled: false
    },
    cell: row => {
      return _.size(row.orderProducts)
    }
  },
  {
    name: trans('gen.actions.actions'),
    allowOverflow: true,
    // omit: !hasAction,
    omit: true,
    grow: 0,
    center: true,
    cell: (row, index, column, id) => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <ActionDropdownToggle />
            <DropdownMenu right>
              <CanCall action='NoPermissionCode' id={`updateUser_${row.id}`}>
                <DropdownItem className='w-100' onClick={e => editModal(row)}>
                  <Eye size={15} />
                  <span className='align-middle ml-50'>{trans('gen.actions.view')}</span>
                </DropdownItem>
              </CanCall>
              {/*<CanCall action='NoPermissionCode' id={`deleteUser_${row.id}`}>*/}
              {/*  <DropdownItem className='w-100 btn-flat-danger' onClick={e => deleteAction(row.id)}>*/}
              {/*    <Trash size={15}/>*/}
              {/*    <span className='align-middle ml-50'>{trans('gen.actions.delete')}</span>*/}
              {/*  </DropdownItem>*/}
              {/*</CanCall>*/}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
const tableActions = ['NoPermissionCode']
//************************************//
class OrdersList extends Component {
  static contextType = AbilityContext
  constructor(props) {
    super(props)
    this.state = {
      userId: props.userId,
      basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}
    }
  }
  //************************************//
  closeModals = () => {
    this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}})
  }
  //************************************//
  openAddModal = () => {
    this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {}}})
  }
  //************************************//
  openEditModal = (data) => {
    this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data}})
  }
  //************************************//
  deleteAction = (id) => {
    _confirm({
      callback: (c) => {
        _deleteApi(id, () => {
          this.dataTableRef._refresh()
          c()
        })
      }
    })
  }
  //************************************//
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const hasAction = _hasAnyAbility(this.context, tableActions)

    const OrderTemp = ({data}) => {
      return <OrderRow orderData={data} successCallback={this.dataTableRef._refresh} />
    }


    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={trans('wattsancnc.nav.ordersList')} breadCrumbParent='' breadCrumbActive='' >
          {/*<CanCall action='NoPermissionCode' id='addUserBtn'>*/}
          {/*  <Button.Ripple className='btn-icon' color='primary' onClick={this.openAddModal}>*/}
          {/*    <Plus size={14} />*/}
          {/*    <span className='ml-25'>{trans('gen.actions.add')}</span>*/}
          {/*  </Button.Ripple>*/}
          {/*</CanCall>*/}
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable
              ref={(ref) => { this.dataTableRef = ref }}
              _fetchData={(params, callback) => _getDatatable('Orders/Read', {...params, filter: {...params.filter, ...this.props.filter}}, callback)}
              columns={tableColumns(this.state, this.openEditModal, this.deleteAction, hasAction)}
              hasIndexing={true}
              // hasFilter={true}
              ExpandableTableRow={<OrderTemp />}
            />
          </Col>
        </Row>
        {basicInfoModalShow && <BasicInfoModal  successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this.closeModals}/>}
      </Fragment>
    )
  }
}
//************************************//
const mapStateToProps = store => ({
  loading: store.app.loading,
  userId: _.get(store, `${env('REACT_APP_AUTH_MODULE')}.userData.id`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(OrdersList)
