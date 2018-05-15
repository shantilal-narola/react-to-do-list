/*
* ToDo Reducer
*/

import {handleResponseErr} from '../../Utilities/functions'


const DEFAULT_STATE = {
  todos: null,
  todo: null,
  totalToDos: 0,
  errMsg: null,
  succMsg: null,
  fetching: false,
}

let changes = null
export default function todosReducer (state = DEFAULT_STATE, action) {

  switch (action.type){

    /*
    * On Pending
    * Action: active fetching
    */
    case "GET_TODOS_PENDING":
    case "GET_TODO_PENDING":
    case "ADD_TODO_PENDING":
    case "DELETE_TODO_PENDING":
    case "EDIT_TODO_PENDING":
      return {...state, fetching: true, errMsg: null, succMsg: null, todo: null}


    /*************************
    *   Index ToDos
    **************************/
    /*
    * On Failed
    * Action: put error message on the state
    */
    case "GET_TODOS_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}

    /*
    * On Success
    * Action: put the todos on the state
    */
    case "GET_TODOS_FULFILLED":
      changes = {
        todos: action.payload.data.data.todos,
        totalToDos: action.payload.data.data.result_total,
        errMsg: null,
        fetching: false,
      }

      return {...state, ...changes}

    // On Delete
    case "DELETE_TODO_FULFILLED":
      changes = {
        todos : state.todos.filter(todo => todo.id != action.payload),
        fetching: false,
        errMsg: null,
        succMsg: null,
      }
      return {...state, ...changes}

    // On failed delete
    case "DELETE_TODO_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}

    /*************************
    *   Show ToDo
    **************************/

    // On success get todo
    case "GET_TODO_FULFILLED":
      changes = {
        todo: action.payload.data.data,
        errMsg: null,
        fetching: false,
      }
      return {...state, ...changes}

    // On failed get todo
    case "GET_TODO_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}

    /*************************
    *   Add ToDo
    **************************/
    // On Success Add todo
    case "ADD_TODO_FULFILLED":
      changes = {
        succMsg: action.payload.data.message,
        errMsg: null,
        fetching: false,
      }
      return {...state, ...changes}

    case "ADD_TODO_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}

    /*************************
    *   Edit ToDo
    **************************/
    // On Success
    case "EDIT_TODO_FULFILLED":
      changes = {
        succMsg: action.payload.data.message,
        errMsg: null,
        fetching: false,
      }
      return {...state, ...changes}

    // On Failed
    case "EDIT_TODO_REJECTED":
      changes = {
        errMsg: handleResponseErr(action.payload),
        fetching: false,
      }
      return {...state, ...changes}
  } // / End Switch

  return state

}
