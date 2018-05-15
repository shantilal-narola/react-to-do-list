import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

import AddToDoForm from './AddToDoForm'

// ToDos Redux Actions
import {addToDo} from '../../../../Redux/actions/todosActions'
import swal from 'sweetalert'

// External Packages
import { CSSTransitionGroup } from 'react-transition-group'

// Material UI Icons
import LoyaltyIcon        from 'material-ui/svg-icons/action/loyalty'

// Global Components
import {
  PagesContainer,
  Breadcrumb,
  PageHeader,
  AlertMsg,
  Loading} from '../../../GlobalComponents/GlobalComponents'

class AddToDo extends Component{

  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const {dispatch, succMsg} = this.props
    var formData = new FormData(e.target)
    let obj = e.target
    dispatch(addToDo(formData)).then(() => {
      const _this = this
      obj.reset()
      swal({
        title: "ToDo added successfully",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "rgb(56, 143, 233)",
        confirmButtonText: "Back to ToDos list",
        closeOnConfirm: true,
      },
      function(){
        _this.setState({redirect: true})
      });
    })

  }

  render(){

    // Store props
    const {errMsg, succMsg, fetching} = this.props

    // Pageheader Options
    const pageHeaderOptions = {
      title: 'Add New ToDo',
      icon: (<LoyaltyIcon className="pagetitle-icon"/>),
    }
    // Trassiosn Options
    const TrassiosnOptions = {
      transitionName: 'example',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300,
    }
    return(
      <PagesContainer>
        <CSSTransitionGroup {...TrassiosnOptions}>
          <Breadcrumb path={['todos','add ToDo']} />
          <PageHeader {...pageHeaderOptions} />

          <div className="page-container">

            {fetching && <Loading  />}
            {this.state.redirect && <Redirect to="/" />}

            <div className="row justify-content-center">
              <div  className="col-lg-8 col-md-8" style={{position: 'inherit'}}>
                <AddToDoForm handleSubmit={this.handleSubmit} />
              </div>
            </div>

            {/* after dispatch, display the error or success message */}
            {(errMsg) && <AlertMsg error={errMsg} />}

          </div>

        </CSSTransitionGroup>
      </PagesContainer>
    )
  }

}

const mapStateToProps = (store) => {
  return {
    errMsg: store.todos.errMsg,
    fetching: store.todos.fetching,
    succMsg: store.todos.succMsg,
  }
}

AddToDo = connect(mapStateToProps)(AddToDo)
export default AddToDo
