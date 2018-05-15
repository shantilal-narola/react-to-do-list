import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import swal from 'sweetalert'
// ToDos Redux Actions
import {getToDo, editToDo} from '../../../../Redux/actions/todosActions'

// Global Components
import {
  PagesContainer,
  Breadcrumb,
  PageHeader,
  Loading,
  AlertMsg} from '../../../GlobalComponents/GlobalComponents'

import EditToDoForm from './EditToDoForm'

// Material UI Icons
import LoyaltyIcon        from 'material-ui/svg-icons/action/loyalty'

class EditToDo extends Component{

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      redirect: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){

    const {dispatch, match} = this.props
    const todoid = match.params.id

    dispatch(getToDo(todoid)).then(() => this.setState({loading: false}))
  }

  handleSubmit(e){
    e.preventDefault()
    const {dispatch, match, succMsg} = this.props
    const todoid = match.params.id
    var formData = new FormData(e.target)
    let obj = e.target
    dispatch(editToDo(todoid, formData)).then(() => {
      const _this = this
      obj.reset()
      swal({
        title: "ToDo updated successfully",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "rgb(56, 143, 233)",
        confirmButtonText: "Back to todos list",
        closeOnConfirm: true,
      },
      function(){
        _this.setState({redirect: true})
      });
    })

  }

  // render
  render(){

    // Store props
    const {todo, errMsg, succMsg, fetching} = this.props

    // Pageheader Options
    const pageHeaderOptions = {
      title: 'Edit ToDo',
      icon: (<LoyaltyIcon className="pagetitle-icon"/>),
    }

    return(
      <PagesContainer path={this.props.location}>
        <Breadcrumb path={['todos','edit']} />
        <PageHeader {...pageHeaderOptions} />

        {this.state.redirect && <Redirect to="/" />}

        <div className="page-container">
          {(fetching) && <Loading />}

          <div className="row justify-content-center">
            <div  className="col-lg-8 col-md-8">
              {(todo && !this.state.loading) && <EditToDoForm handleSubmit={this.handleSubmit} todo={todo} />}
              {(errMsg) && <AlertMsg error={errMsg} />}
            </div>
          </div>

        </div>
      </PagesContainer>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    todo: store.todos.todo,
    errMsg: store.todos.errMsg,
    succMsg: store.todos.succMsg,
    fetching: store.todos.fetching,
  }
}

EditToDo = connect(mapStateToProps)(EditToDo)
export default EditToDo
