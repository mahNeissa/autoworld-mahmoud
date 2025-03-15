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

// Example List View Component
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
                    <strong>Name:</strong> {rowData.name}
                </li>
                <li>
                    <strong>Order:</strong> {rowData.order}
                </li>
                <li>
                    <strong>Is Active:</strong> {rowData.brandsCountry?.isActive ? 'Yes' : 'No'}
                </li>
                {/* Add more fields as needed */}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
const tableColumns = (state, view, edit, hasAction, handleViewDetails) => [
    {
        name: 'Brand',
        selector: 'brands.name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }
    },
    {
        name: 'Order',
        selector: 'order',
        sortable: true,
        grow: 1,
        // minWidth: '225px',
        filter: {
            enabled: true
        }

    },
    {
        name: 'Is Active',
        selector: 'isActive',
        sortable: true,
        grow: 1,
        // // minWidth: '225px',
        cell: row => {
            const test = row.isActive
            return (
                <div>
                    {test ? <CheckboxBasic/> : <UnCheckboxBasic/> }
                 </div>
            )
        },

        filter: {
            enabled: false
        }
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
        }
    }

]
const tableActions = ['NoPermissionCode']
//************************************//
class CarModelList extends Component {
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
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={<h1 className={'Brands'}> Car Models </h1>} breadCrumbParent='' breadCrumbActive='' >
                    <Button.Ripple className='btn-icon' color='primary' onClick={this.openBasicInfoModal}>
                        <Plus size={14} />
                        <span className='ml-25'>{trans('gen.actions.add')}</span>
                    </Button.Ripple>
                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable
                            //ref={(ref) => { this.dataTableRef = ref }}
                            _fetchData={(params, callback) => _getDatatable('CarModels/CarModels_Read', {...params, filter: {...params.filter}}, callback)}
                            columns={tableColumns(this.state, this.openDetailsModal, this.editBasicInfoModal, hasAction)}
                            hasIndexing={false}
                            hasFilter={false}
                        />
                    </Col>
                </Row>
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(CarModelList)
