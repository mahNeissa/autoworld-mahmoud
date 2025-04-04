import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import '../../app.css'
import {Plus, Eye, Edit, Trash} from 'react-feather'
import {Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable, {ActionDropdownToggle} from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import {_getDatatable} from "@csrc/utility/Utils"
import BasicInfoModal from './BasicInfoModal'
import {OrderStatus} from './order-status'
import {useState} from "."
import PopupAlert from './modification-state' // MODIFICATION: Import the PopupAlert component

//************************************//

const tableColumns = (state, view, _editBasicInfoModal, _handleViewDetails, edit, hasAction, handleModifyState) => [
    {
        name: 'Serial',
        selector: 'serial',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Name',
        selector: 'user.name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Insert Date',
        selector: 'insertDate',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        cell: row => {
            return row.insertDate
                ? (() => {
                    const date = new Date(row.insertDate) //
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
        name: 'LastUpdateDate',
        selector: 'lastUpdateDate',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        cell: row => {
            return row.lastUpdateDate
                ? (() => {
                    const date = new Date(row.lastUpdateDate) // Use row.lastUpdateDate
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
        name: 'End Date',
        selector: 'endDate',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        cell: row => {
            return row.endDate
                ? (() => {
                    const date = new Date(row.endDate) // Use row.lastUpdateDate
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
    // {
    //     name: 'Details',
    //     allowOverflow: true,
    //     grow: 1,
    //     center: true,
    //     cell: (row, index, column, id) => {
    //         return (
    //             <div className='d-flex'>
    //                             <div   onClick={e =>  _handleViewDetails(row)} style={{ cursor: 'pointer' }}>
    //                                 <Eye size={15} />
    //                             </div>
    //             </div>
    //         )
    //     }
    // },
    {
        name: 'Modify',
        allowOverflow: true,
        grow: 0,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <ActionDropdownToggle />
                        <DropdownMenu right>
                            <DropdownItem  className='w-100'   onClick={() => _handleViewDetails(row)} style={{ cursor: 'pointer' }}>
                                <Eye size={20} weight="bold"/>
                                {/*<span className='align-middle ml-50'>{trans('gen.actions.view')}</span>*/}
                            </DropdownItem>
                            <DropdownItem className='ThreePoints' onClick={e => { handleModifyState(row) }} style={{ cursor: 'pointer' }}>
                                <Edit size={20} weight="bold"/>
                                {/*<span className='edit_className'>edit</span>*/}
                            </DropdownItem>
                            <DropdownItem className='ThreePoints' onClick={e => _deleteUser(row.id)} disabled={row.id === state.userId || row.id === 1}>
                                <Trash size={20} weight="bold"/>
                                {/*<span className='trash_className'>Delete</span>*/}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }

    // {
    //     name: 'Modify State',
    //     allowOverflow: true,
    //     grow: 1,
    //     center: true,
    //     cell: (row, index, column, id) => {
    //         return (
    //             <div className='d-flex'>
    //                 <div   onClick={e =>  handleModifyState(row)} style={{ cursor: 'pointer' }}>
    //                     <Edit size={15} />
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

]
const tableActions = ['NoPermissionCode']
//************************************//
class OrderList extends Component {
    static contextType = AbilityContext
    constructor(props) {
        super(props)
        this._handleViewDetails = this._handleViewDetails.bind(this)
        this.state = {
            //userId: props.userId,
            basicInfoModal: { basicInfoModalShow: false, basicInfoModalData: {}, viewOnly: false }, // Added viewOnly: false
            detailsModal: {detailsModalShow: false, detailsModalData: {}},
            showAlert: false, // MODIFICATION: Add showAlert state
            alertRowData: null // MODIFICATION: Add alertRowData state
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
    _handleViewDetails = (data) => {
        console.log("_handleViewDetails called") // Add this line
        this.setState({ basicInfoModal: { basicInfoModalShow: true, basicInfoModalData: data, viewOnly: true } }, () => {
        console.log("BasicInfoModal State:", this.state.basicInfoModal) // Add this line

        })
    }
    //************************************//
    openDetailsModal = (categoryId) => {
        this.setState({detailsModal: {detailsModalShow: false, detailsModalData: {categoryId}}})
    }
    //************************************//
    handleModifyState = (rowData) => { // MODIFICATION: Add handleModifyState function
        this.setState({ showAlert: true, alertRowData: rowData })
    }

    handleYes = () => { // MODIFICATION: Add handleYes function
        console.log('Yes clicked for:', this.state.alertRowData)
        this.setState({ showAlert: false, alertRowData: null })
        // Add your "yes" logic here, using the rowData from this.state.alertRowData
    }

    handleNo = () => { // MODIFICATION: Add handleNo function
        console.log('No clicked')
        this.setState({ showAlert: false, alertRowData: null })
    }
    render () {
        const {  basicInfoModal, showAlert, alertRowData } = this.state
        // console.log("basicInfoModal.viewOnly in render:", basicInfoModal.viewOnly) // Add this line
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={<h1 className={'Brands'}> Orders </h1>} breadCrumbParent='' breadCrumbActive='' >
                    <Button.Ripple className='btn-icon' color='primary' onClick={this.openBasicInfoModal}>
                        <Plus size={14} />
                        <span className='ml-25'>{trans('gen.actions.add')}</span>
                    </Button.Ripple>

                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable
                            //ref={(ref) => { this.dataTableRef = ref }}
                            _fetchData={(params, callback) => _getDatatable('Orders/Orders_Read', {...params, filter: {...params.filter}}, callback)}
                            columns={tableColumns(this.state, this.openDetailsModal, this._handleViewDetails, this._editBasicInfoModal, this.editBasicInfoModal, hasAction, this.handleModifyState)}
                            hasIndexing={false}
                            hasFilter={false}
                        />
                    </Col>
                </Row>
                {/*{detailsModalShow && <DetailsModal successCallback={() => {}} data={detailsModalData} onClose={this.closeDetailsModal}/>}*/}
                {/*{basicInfoModalShow && <BasicInfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this.closeBasicInfoModal}/>}*/}
                {basicInfoModal.basicInfoModalShow && (
                    console.log("Passing viewOnly to modal:", basicInfoModal.viewOnly),
                    <BasicInfoModal
                        key={basicInfoModal.basicInfoModalData?.id} //add the key prop here
                        isOpen={basicInfoModal.basicInfoModalShow}
                        successCallback={() => this.dataTableRef._refresh()}
                        data={basicInfoModal.basicInfoModalData}
                        onClose={this.closeBasicInfoModal}
                        viewOnly = {basicInfoModal.viewOnly} //ensure that you are passing the view only prop.

                    />
                )}
                {showAlert && ( // MODIFICATION: Render PopupAlert conditionally
                    <PopupAlert
                        message="Are you sure you want to modify the state?"
                        onYes={this.handleYes} // MODIFICATION: Pass handleYes
                        onNo={this.handleNo} // MODIFICATION: Pass handleNo
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(OrderList)
