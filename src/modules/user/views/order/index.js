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
import {OrderStatus, trueFaulse} from './order-status'
import {redColor} from "../../../../assets/data/colors/palette"
import StatusStepper from "../../../../components/StatusStepper"
import {useState} from "."
// import DetailsModal from "../details-modal"
//************************************//

const tableColumns = (state, view, _editBasicInfoModal, _handleViewDetails, edit, hasAction) => [
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
        name: 'Category',
        selector: 'categoryId',
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
        }

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
        }

    },
    {
        name: 'View',
        allowOverflow: true,
        grow: 0,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                                <div   onClick={e =>  _handleViewDetails(row)} style={{ cursor: 'pointer' }}>
                                    <Eye size={15} />
                                    <span className='align-middle ml-50'>{trans('gen.actions.view')}</span>
                                </div>
                </div>
            )
        }
    }

]
const tableActions = ['NoPermissionCode']
//************************************//
class BrandList extends Component {
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
    _handleViewDetails = (data) => {
        console.log("_handleViewDetails called") // Add this line
        this.setState({ basicInfoModal: { basicInfoModalShow: true, basicInfoModalData: data, viewOnly: true } }, () => {
        console.log("BasicInfoModal State:", this.state.basicInfoModal) // Add this line

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
    render () {
        const {  basicInfoModal, selectedRowData } = this.state
        console.log("basicInfoModal.viewOnly in render:", basicInfoModal.viewOnly) // Add this line

        const {detailsModalShow, detailsModalData} = this.state.detailsModal
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (


            <Fragment>

                <StatusStepper/>

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
                            columns={tableColumns(this.state, this.openDetailsModal, this._handleViewDetails, this._editBasicInfoModal, this.editBasicInfoModal, hasAction)}
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
            </Fragment>
        )
    }
}
//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading
    //userId: _.get(store, `${env('REACT_APP_AUTH_MODULE')}.userData.id`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(BrandList)
