/*
* Login - Component connected to redux
*/

// Import main packages
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

// Login Action - Redux Action
import {login, initAuth} from '../../../../Redux/actions/authActions'

// Components
import LoginContainer from "../loginContainer/LoginContainer"
import LoginForm from './LoginForm'

// Global Components
import Loading from '../../../GlobalComponents/Loading'
import AlertMsg from '../../../GlobalComponents/AlertMsg'

// External Packages
import serializeForm from 'form-serialize'


class Login extends Component{

  constructor(props){
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch(initAuth())
  }

  // On Login form submit
  handleLogin(e){
    e.preventDefault()

    // get dispatch from props
    const {dispatch} = this.props

    // get form data
    let formData = serializeForm(e.target, { hash: true })


    // dispatch
    dispatch(login(formData))
  }

  render(){
    // get messages from Redux store
    const {errMsg, succMsg, fetching} = this.props
    const isLogged = (sessionStorage.getItem('TOKEN')) ? true : false

    return(

      <LoginContainer title="Login">

        {isLogged && <Redirect to="/"   />}

        {/* Loading */}
        {fetching && <Loading />}

        {/* after dispatch, display the error or success message */}
        {(errMsg || succMsg) && <AlertMsg error={errMsg} success={succMsg} />}

        {/* login form */}
        <LoginForm onSubmit={this.handleLogin}  />

      </LoginContainer>

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

const LoginApp = connect(mapStateToProps)(Login);
export default LoginApp;
