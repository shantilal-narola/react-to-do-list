/*
* IndexToDos - Component connected to redux
*/

// import main packages
import React, {Component} from 'react'
import {connect} from 'react-redux'

import swal from 'sweetalert'

// ToDos Redux Actions
import {
  getToDos,
  deleteToDo,
  isCompleted
  } from '../../../../Redux/actions/todosActions'

import {deleteItem} from '../../../../Utilities/functions'

// Table row ToDo
import RowToDo  from './rowToDo/RowToDo'
import {DummyRowToDo} from './rowToDo/DummyRowToDo'

// Global Components
import {
  PagesContainer,
  Breadcrumb,
  PageHeader,
  TableList} from '../../../GlobalComponents/GlobalComponents'

// Material UI Icons
import ToDoIcon           from 'material-ui/svg-icons/social/group-add'

// External Packages
import { CSSTransitionGroup } from 'react-transition-group'

class IndexToDos extends Component{

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      comID: 'ToDos',
      currentPage: 1,
      showToDos: 10,
      sort_by: 'id',
      sort_direction: 'desc',
    }
    this.handlePagination   = this.handlePagination.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.hanldeIsCompleted = this.hanldeIsCompleted.bind(this)
    this.handleSorting = this.handleSorting.bind(this)
    this.setSession = this.setSession.bind(this)
    this.getSession = this.getSession.bind(this)
  }

  componentWillMount(){

    this.setSession('currentPage', this.getSession('currentPage'))
    this.setSession('showToDos', this.getSession('showToDos'))
    this.setSession('sort_by', this.getSession('sort_by'))
    this.setSession('sort_direction', this.getSession('sort_direction'))

    const offset = (this.getSession('currentPage') - 1) * this.getSession('showToDos')

    // On Load the Component get the ToDos
    const {dispatch} = this.props
    dispatch(getToDos(
      this.getSession('showToDos'),
      offset,
      this.getSession('sort_by'),
      this.getSession('sort_direction')),
    ).then(() => {

      // stop loading if successfull fetched the ToDos
      this.setState({loading: false})

    })
  }

  setSession(par, value){

    if(typeof(value) === 'object'){
      value = this.state[par]
    }

    sessionStorage.setItem(this.state.comID+'-'+par,value)
    var obj = {};
    obj[par] = value
    this.setState(obj)
  }

  getSession(par){
    return sessionStorage.getItem(this.state.comID+'-'+par)
  }

  /***************************
  * On Click Delete
  * @ToDoid : (Intger)
  ****************************/
  handleDelete(ToDoid){
    const {dispatch, errMsg, succMsg} = this.props
    let _this = this
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: 'Yes, Delete it!',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    },
    () => {
      dispatch(deleteToDo(ToDoid)).then(res => {
        swal({
          title: 'Deleted',
          type: 'success',
          text: succMsg,
          timer: 2000,
          showConfirmButton: false
        })
      })
      .catch(err => {
        _this.forceUpdate()
        swal("Error", err.response.data.message, "error");
      })
    })
  }


  /***************************
  * On Click hanldeIsCompleted
  ****************************/
  hanldeIsCompleted(ToDoid){

    const {dispatch} = this.props

    dispatch(isCompleted(ToDoid))

  }

  /***************************
  * On Click Pagination
  ****************************/
  handlePagination(e, page){
    e.preventDefault()
    const {dispatch} = this.props
    const {sort_by, sort_direction, search} = this.state
    // prepair the offset
    const offset = (page - 1) * this.state.showToDos

    // get ToDos
    dispatch(getToDos(
      this.state.showToDos,  // limit
      offset, // offset
      sort_by, // sort by
      sort_direction // sort direction
    )).then(() => {
      // change the Pagination number
      this.setState({currentPage: page})
      this.setSession('currentPage', page)
    })

  }

  /***************************
  * Handle Sorting
  ****************************/
  handleSorting(sort_by){
    if(sort_by === 0) return false
    const {dispatch} = this.props
    const {sort_direction} = this.state
    const sort_dir = (sort_direction === 'asc') ? 'desc' : 'asc'

    this.setState({
      sort_by: sort_by,
      sort_direction: sort_dir
    })
    this.setSession('sort_by', sort_by)
    this.setSession('sort_direction', sort_dir)
    this.setSession('currentPage', 1)

    dispatch(getToDos(
      this.getSession('showToDos'), // limit
      0, // offset
      this.getSession('sort_by'), // sort by
      this.getSession('sort_direction'), // sort direction
    ))

  }

  // render
  render(){

    // Table columns
    const columns = [
      {params: 'id', title: 'ID'},
      {params: 'data', title: 'Data'},
      {params: 'due_date', title: 'Due Date'},
      {params: 'priority', title: 'Priority'},
      {params: 'is_completed', title: 'Complete'},
    ]
    // store data
    const {ToDos, fetching, errMsg, totalToDos } = this.props

    // Trassiosn Options
    const TrassiosnOptions = {
      transitionName: 'example',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300,
    }

    // Pageheader Options
    const pageHeaderOptions = {
      title: 'ToDos List',
      icon: (<ToDoIcon className="pagetitle-icon"/>),
      addbtn: "/todos/add"
    }

    // TableList Options
    const tableListOptions = {
      columns: columns,
      loading: this.state.loading,
      update: fetching,
      onPageChange: this.handlePagination,
      total: totalToDos,
      rowShowing: parseInt(this.getSession('showToDos')),
      page: this.getSession('currentPage'),
      onError: errMsg,
      onSorting: this.handleSorting
    }


    return(
      <PagesContainer path={this.props.location}>
        <CSSTransitionGroup {...TrassiosnOptions}>
          <Breadcrumb path={['todos']} />
          <PageHeader {...pageHeaderOptions} />
          <TableList {...tableListOptions}>

            { // if fetched ToDos
              !this.state.loading ?
              (
                ToDos.map(todo => {
                  return (<RowToDo
                              key={'todo-'+todo.id}
                              todo={todo}
                              onDelete={this.handleDelete}
                              onToggle={this.hanldeIsCompleted}
                              />)
                })
              )
              :
              (
                DummyRowToDo()
              )
            /* end if */ }

          </TableList>
        </CSSTransitionGroup>
      </PagesContainer>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    ToDos: store.todos.todos,
    totalToDos: store.todos.totalToDos,
    errMsg: store.todos.errMsg,
    fetching: store.todos.fetching,
  }
}

IndexToDos = connect(mapStateToProps)(IndexToDos)
export default IndexToDos
