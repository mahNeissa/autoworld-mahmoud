import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import '../../app.css'
import {CheckboxBasic, UnCheckboxBasic} from '../forms/CheckboxBasic'
import {FileText, MoreVertical, Send, Plus, Key, User, Eye, Trash} from 'react-feather'

import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable, {ActionDropdownToggle} from '@src/components/datatable'
import {trans, _confirm, _url, env} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import {_getDatatable} from "@csrc/utility/Utils"
//************************************//
import {_activateTeamMember, _deactivateTeamMember, _deleteResponsible} from '../../redux/actions'
import CanCall from '../../components/CanCall'
import BasicInfoModal from './BasicInfoModal'
import {redColor} from "../../../../assets/data/colors/palette"
// import DetailsModal from "../details-modal"
//************************************//
const RowDetailsListView = ({ rowData, onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(+150%, -50%)',
                background: 'white',
                padding: '20px',
                border: '1px solid #ccc',
                zIndex: 2000
            }}
        >
            <h3>View Details</h3>
            <ul>
                <li>
                    <strong>Brand:</strong> {rowData.brands?.name}
                </li>
                <li>
                    <strong>Model:</strong> {rowData.carModels?.name}
                </li>
                <li>
                    <strong>Type:</strong> {rowData.type}
                </li>
                <li>
                    <strong>Owner:</strong> {rowData.user?.name}
                </li>
                <li>
                    <strong>Serial:</strong> {rowData.serial}
                </li>
                <li>
                    <strong>Is Paid:</strong> {rowData.isPaid ? 'Yes' : 'No'}
                </li>
                <li>
                    <strong>Price:</strong> {rowData.price}
                </li>
                {/* Add more fields as needed */}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
const tableColumns = (state, view, _editBasicInfoModal, edit, hasAction, handleViewDetails) => [
    {
        name: 'Brand',
        selector: 'brands.name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' }, // Add inline styles
        cell: row => <span title={row.brands && row.brands.name}>{row.brands && row.brands.name}</span> // Added title

    },
    {
        name: 'Model',
        selector: 'carModels.name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' }, // Add inline styles
        cell: row => <span title={row.carModels && row.carModels.name}>{row.carModels && row.carModels.name}</span> // Added title

    },
    {
        name: 'Type',
        selector: 'type',
        sortable: true,
        grow: 1,
        cell: row => {
            const test = row.type
            let displayType
            if (test === 1) {
                displayType = 'SUV (4x4)'
            } else if (test === 2) {
                displayType = 'Sedan'
            } else {
                displayType = 'Pickup (4x4)'
            }
            return <span title={displayType}>{displayType}</span> // Added title
        },
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Owner',
        selector: 'user.name',
        sortable: true,
        grow: 1,
        cell: row => <span title={row.user && row.user.name}>{row.user && row.user.name}</span>, // Added title
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Serial',
        selector: 'serial',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Is Paid',
        selector: 'isPaid',
        sortable: true,
        grow: 1,
        // // minWidth: '225px',
        cell: row => {
            const test = row.isPaid
            return (
                <div>
                    {test ? <CheckboxBasic/> : <UnCheckboxBasic/> }
                 </div>
            )
        },

        filter: {
            enabled: false
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Price',
        selector: 'price',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'InsertDate',
        selector: 'insertDate',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    },
    {
        name: 'Modify',
        allowOverflow: true,
        grow: 0,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <ActionDropdownToggle />
                        <DropdownMenu >
                                <DropdownItem  className='w-100'   onClick={() => handleViewDetails(row)}>
                                    <Eye size={15} />
                                    <span className='align-middle ml-50'>{trans('gen.actions.view')}</span>
                                </DropdownItem>
                                <DropdownItem className='ThreePoints' onClick={e => _editBasicInfoModal(row)} disabled={row.id === 1 && state.userId !== 1}>
                                    <FileText size={15} color={'blue'} />
                                    <span className='edit_className'>edit</span>
                                </DropdownItem>
                                <DropdownItem className='ThreePoints' onClick={e => _deleteUser(row.id)} disabled={row.id === state.userId || row.id === 1}>
                                    <Trash size={15} color={'red'}/>
                                    <span className='trash_className'>Delete</span>
                                </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        },
        style: { width: '50px', color: 'black', fontWeight: 'bold', fontSize:'15px', borderRight: '2px solid #F2F2F2' } // Add inline styles

    }

]
const tableActions = ['NoPermissionCode']
//************************************//
class CarSellList extends Component {
    static contextType = AbilityContext
    constructor(props) {
        super(props)
        this.state = {
            basicInfoModal: { basicInfoModalShow: false, basicInfoModalData: {} },
            detailsModal: { detailsModalShow: false, detailsModalData: {} },
            selectedRowData: null
        }
    }
    //************************************//
    closeBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}})
    }
    //************************************//
    openBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {}}})
    }
    //************************************//
    editBasicInfoModal = (data) => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data}})
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
    handleViewDetails = (row) => { // Create handleViewDetails function
        this.setState({ selectedRowData: row })
    }
    //************************************//
    handleCloseDetails = () => { // Create handleCloseDetails function
        this.setState({ selectedRowData: null })
    }
    //************************************//
    _editBasicInfoModal = (data) => {
        console.log("Edit modal function called with data:", data)
        this.setState({ basicInfoModal: { basicInfoModalShow: true, basicInfoModalData: data } }, () => {
            console.log("State updated:", this.state.basicInfoModal)
        })
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
    render () {
        const {  basicInfoModal, selectedRowData } = this.state
        const {detailsModalShow, detailsModalData} = this.state.detailsModal
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={<h1 className={'Brands'}> Car Sells </h1>} breadCrumbParent='' breadCrumbActive='' >
                    <Button.Ripple className='btn-icon' color='primary' onClick={this.openBasicInfoModal}>
                        <Plus size={14} />
                        <span className='ml-25'>{trans('gen.actions.add')}</span>
                    </Button.Ripple>
                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable
                            //ref={(ref) => { this.dataTableRef = ref }}
                            _fetchData={(params, callback) => _getDatatable('CarSell/CarSell_Read', {...params, filter: {...params.filter}}, callback)}
                            columns={tableColumns(this.state, this.openDetailsModal, this._editBasicInfoModal, this.editBasicInfoModal, hasAction, this.handleViewDetails)}
                            hasIndexing={false}
                            hasFilter={false}
                        />
                    </Col>
                </Row>
                {selectedRowData && (
                    <RowDetailsListView rowData={selectedRowData} onClose={this.handleCloseDetails} />
                )}
                {/*{basicInfoModalShow && (*/}
                {/*    <BasicInfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this.closeBasicInfoModal} />*/}
                {/*)}*/}
                {basicInfoModal.basicInfoModalShow && (
                    <BasicInfoModal
                        isOpen={basicInfoModal.basicInfoModalShow}
                        successCallback={() => this.dataTableRef._refresh()}
                        data={basicInfoModal.basicInfoModalData}
                        onClose={this.closeBasicInfoModal}
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(CarSellList)
