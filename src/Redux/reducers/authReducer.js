import {handleResponseErr} from '../../Utilities/functions'
import {onSuccessLogin} from '../actions/authActions'

const DEFAULT_STATE = {
  errMsg: null,
  succMsg: null,
  fetching: false,
}

let changes = null
export default function authReducer (state = DEFAULT_STATE, action) {
  switch (action.type){

    /*
    * On Pending
    * Action: active fetching
    */
    case "LOGIN_REQUEST_PENDING":
    case "REGISTRATION_REQUEST_PENDING":
    case "INIT_AUTH_PENDING":
      return {...state, fetching: true, errMsg: null, succMsg: null}

    /*
    * On Failed
    * Action: put error message on the state
    */
    case "LOGIN_REQUEST_REJECTED":
    case "REGISTRATION_REQUEST_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}

    /*
    * On Success
    * Action: put success message and run onSuccess function from actions
    */
    case "LOGIN_REQUEST_FULFILLED":
      changes = {
        succMsg: action.payload.data.message,
        user: action.payload.data.data.users,
        errMsg: null,
        fetching: false,
      }
      onSuccessLogin(action.payload.data.data)
      return {...state, ...changes}

    case "REGISTRATION_REQUEST_FULFILLED":
      changes = {
        succMsg: action.payload.data.message,
        user: action.payload.data.data.users,
        errMsg: null,
        fetching: false,
      }
      return {...state, ...changes}

    case "INIT_AUTH_FULFILLED":
      return {...state, fetching: false}
  }
  return state
}
