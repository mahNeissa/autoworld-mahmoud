import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import '../../app.css'
import {CheckboxBasic, UnCheckboxBasic} from '../forms/CheckboxBasic'
import {FileText, MoreVertical, Send, Plus, Key, User, Trash} from 'react-feather'

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
import OrderStatus from './constants'
//import OrderStatus from './constants'
import {redColor} from "../../../../assets/data/colors/palette"
// import DetailsModal from "../details-modal"
//************************************//
// const OrderStatus = [
//     {key: 0, value: <Badge color='light-primary'>New</Badge>},
//     {key: 1, value: 'Reply by supplier'},
//     {key: 2, value: 'Laser_source'},
//     {key: 3, value: 'Hardware'},
//     {key: 4, value: 'Optics'},
//     {key: 5, value: 'Electrics'},
//     {key: 6, value: 'Options'},
//     {key: 7, value: 'Mechanics'}
// ]
const tableColumns = (state, view, edit, hasAction) => [
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
        name: 'Modify',
        allowOverflow: true,
        grow: 0,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <ActionDropdownToggle />
                        <DropdownMenu >
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
class BrandList extends Component {
    static contextType = AbilityContext
    constructor(props) {
        super(props)
        this.state = {
            //userId: props.userId,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
            detailsModal: {detailsModalShow: false, detailsModalData: {}}
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
                            columns={tableColumns(this.state, this.openDetailsModal, this._editBasicInfoModal, this.editBasicInfoModal, hasAction, this.handleViewDetails)}
                            hasIndexing={false}
                            hasFilter={false}
                        />
                    </Col>
                </Row>
                {/*{detailsModalShow && <DetailsModal successCallback={() => {}} data={detailsModalData} onClose={this.closeDetailsModal}/>}*/}
                {/*{basicInfoModalShow && <BasicInfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this.closeBasicInfoModal}/>}*/}
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(BrandList)
