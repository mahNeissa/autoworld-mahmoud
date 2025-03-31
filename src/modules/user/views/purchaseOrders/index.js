import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import '../../app.css'
import { Eye} from 'react-feather'

import {
    Row,
    Col
  } from 'reactstrap'
import { Link } from 'react-router-dom'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext } from '@src/utility/context/Can'
import {_getDatatable} from "@csrc/utility/Utils"
//************************************//
import { _deleteResponsible} from '../../redux/actions'
import BasicInfoModal from './BasicInfoModal'
import {OrderStatus} from './order-status'
import {useState} from "."
//************************************//
// Function to group data by purchaseOrder.id
const groupDataByPurchaseOrderId = (data) => {
    // MARK: Creating the groupDataByPurchaseOrderId function
    return _.groupBy(data, 'purchaseOrder.id')
}
const tableColumns = (state, view, _editBasicInfoModal, _handleViewDetails, edit, hasAction) => [
    {
        name: 'Serial',
        selector: 'purchaseOrder.serial',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Name',
        selector: 'purchaseOrder.user.name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Mobile',
        selector: 'purchaseOrder.user.mobile',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Insert Date',
        selector: 'purchaseOrder.insertDate',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        cell: row => {
            return row.purchaseOrder.insertDate
                ? (() => {
                    const date = new Date(row.purchaseOrder.insertDate) //
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    const hours = String(date.getHours()).padStart(2, '0')
                    const minutes = String(date.getMinutes()).padStart(2, '0')
                    return `${year}-${month}-${day} ${hours}:${minutes}`
                })()
                : 'N/A'
        }
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        grow: 1,
        center: true,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        cell: row => {
            const orderstatus = row.status
            return <span> {OrderStatus[orderstatus].value} </span> // Added title
        }
    },
    {
        name: 'Details',
        allowOverflow: true,
        grow: 1,
        center: true,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                    <div onClick={(e) => {
                        console.log('View button clicked!')
                        _handleViewDetails(row)
                    }} style={{ cursor: 'pointer' }}>
                        <Eye size={15} />
                    </div>
                </div>
            )
        }
    }

]
const tableActions = ['NoPermissionCode']
//************************************//
class PurchaseOrderList extends Component {
    static contextType = AbilityContext
    constructor(props) {
        super(props)
        this._handleViewDetails = this._handleViewDetails.bind(this)
        this.state = {
            //userId: props.userId,
            basicInfoModal: { basicInfoModalShow: false, basicInfoModalData: {}, viewOnly: false }, // Added viewOnly: false
            detailsModal: {detailsModalShow: false, detailsModalData: {}}

        }
    }
    //************************************//
    closeBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}, viewOnly: false}})
    }
    //************************************//
    openBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {}, viewOnly: false}})
    }
    //************************************//
    editBasicInfoModal = (data) => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data, viewOnly: false}})
    }
    //************************************//
    _editBasicInfoModal = (data) => {
        this.setState({ basicInfoModal: { basicInfoModalShow: true, basicInfoModalData: data, viewOnly: false } }, () => {
        })
    }
    //************************************//
    // _handleViewDetails = (data) => {
    //     console.log("_handleViewDetails called") // Add this line
    //     this.setState({ basicInfoModal: { basicInfoModalShow: true, basicInfoModalData: data, viewOnly: true } }, () => {
    //     console.log("BasicInfoModal State:", this.state.basicInfoModal) // Add this line
    //
    //     })
    // }
    _handleViewDetails = (data) => {
        _getDatatable("PurchaseOrders/PurchaseOrders_Read", { filter: { "purchaseOrder.id": data.purchaseOrder.id } }, (result) => {
            console.log('API Result:', result)
            if (result && result.list) { // Change to check for result.list
                console.log('API Result List:', result.list)// added console log
                const groupedData = groupDataByPurchaseOrderId(result.list) // Change to use result.list
                console.log('Grouped Data:', groupedData[data.purchaseOrder.id])
                this.setState({
                    basicInfoModal: {
                        basicInfoModalShow: true,
                        basicInfoModalData: groupedData[data.purchaseOrder.id],
                        viewOnly: true
                    }
                })
            } else {
                console.error("Error fetching purchase order details.", result)
            }
        })
    }

    //************************************//
    closeDetailsModal = () => {
        this.setState({detailsModal: {detailsModalShow: false, detailsModalData: {}}})
    }
    //************************************//
    openDetailsModal = (categoryId) => {
        this.setState({detailsModal: {detailsModalShow: false, detailsModalData: {categoryId}}})
    }
    //************************************//
    deleteUser = (id) => {
        _confirm({
            callback: (c) => {
                _deleteResponsible(id, () => {
                    this.dataTableRef._refresh()
                    c()
                })
            }
        })
    }
    //************************************//
    render() {
        const { basicInfoModal } = this.state
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={<h1 className={'Brands'}> Purchase Orders </h1>} />
                <Row>
                    <Col sm='12'>
                        <DataTable
                            _fetchData={(params, callback) => {
                                _getDatatable('PurchaseOrders/PurchaseOrders_Read', { ...params, filter: { ...params.filter } }, (result) => {
                                    if (result && result.list) {
                                        const uniqueIds = new Set()
                                        const uniqueData = result.list.filter((row) => {
                                            if (uniqueIds.has(row.purchaseOrder.id)) {
                                                return false // Skip duplicate
                                            }
                                            uniqueIds.add(row.purchaseOrder.id)
                                            return true // Add unique row
                                        })
                                        callback({ ...result, list: uniqueData })
                                    } else {
                                        callback(result)
                                    }
                                })
                            }}
                            columns={tableColumns(this.state, null, null, this._handleViewDetails)}
                            hasIndexing={false}
                            hasFilter={false}
                        />
                    </Col>
                </Row>
                {basicInfoModal.basicInfoModalShow && (
                    <BasicInfoModal
                        isOpen={basicInfoModal.basicInfoModalShow}
                        // MARK: Passing the grouped data (parent and childs) to BasicInfoModal
                        data={basicInfoModal.basicInfoModalData}
                        onClose={this.closeBasicInfoModal}
                        viewOnly={basicInfoModal.viewOnly}
                    />
                )}
            </Fragment>
        )
    }
}
//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading
    //userId: _.get(store, `${env('REACT_APP_AUTH_MODULE')}.userData.id`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(PurchaseOrderList)

