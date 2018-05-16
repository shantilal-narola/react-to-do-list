/*
* Registration - Component connected to redux
*/

// Import main packages
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

// Registration Action - Redux Action
import {registration, initAuth} from '../../../../Redux/actions/authActions'

// Components
import RegistrationContainer from "../registrationContainer/RegistrationContainer"
import RegistrationForm from './RegistrationForm'

// Global Components
import Loading from '../../../GlobalComponents/Loading'
import AlertMsg from '../../../GlobalComponents/AlertMsg'

// External Packages
import serializeForm from 'form-serialize'


class Registration extends Component{

  constructor(props){
    super(props)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch(initAuth())
  }

  // On Registration form submit
  handleRegistration(e){
    e.preventDefault()

    // get dispatch from props
    const {dispatch} = this.props

    // get form data
    let formData = serializeForm(e.target, { hash: true })


    // dispatch
    dispatch(registration(formData))
  }

  render(){
    // get messages from Redux store
    const {errMsg, succMsg, fetching} = this.props
    // const isLogged = (sessionStorage.getItem('TOKEN')) ? true : false

    return(

      <RegistrationContainer title="Registration">

        {succMsg && <Redirect to="/login" />}

        {/* Loading */}
        {fetching && <Loading />}

        {/* after dispatch, display the error or success message */}
        {(errMsg || succMsg) && <AlertMsg error={errMsg} success={succMsg} />}

        {/* registration form */}
        <RegistrationForm onSubmit={this.handleRegistration}  />

      </RegistrationContainer>

    )
  }
}

const mapStateToProps = (store) => {
  return {
    errMsg: store.auth.errMsg,
    succMsg: store.auth.succMsg,
    fetching: store.auth.fetching,
  }
}

const RegistrationApp = connect(mapStateToProps)(Registration);

export default RegistrationApp;
