/****************
*   ToDos Actions
*
*   @GET_TODOS
*   @GET_TODO
*   @ADD_TODO
*   @DELETE_TODO
*   @UPDATE_TODO
*
/****************/

import {handleAPI, API_VERSION} from '../../Utilities/handleAPI'

/*
*   getToDos - fetch todos
*/
export function getToDos(limit = 10, offset = 0, sort_by = 'id', sort_direction = 'asc'){

  let url           = '/'+API_VERSION+'/todos?limit='+limit+'&offset='+offset
  const method        = 'GET'
  const locale        = localStorage.getItem('LOCALE')
  const Authorization = {'access-token':sessionStorage.getItem('TOKEN')}

  url += '&sort_by='+sort_by+'&sort_direction='+sort_direction

  return {
    type: 'GET_TODOS',
    payload: handleAPI(url, method, false, Authorization)
  }

}

/*
*   Get ToDo
*
*   @todoid
*/
export function getToDo(todoid){

  const url           = '/'+API_VERSION+'/todos/'+todoid
  const method        = 'GET'
  const locale        = localStorage.getItem('LOCALE')
  const Authorization = {'access-token':sessionStorage.getItem('TOKEN')}



  return {
    type: 'GET_TODO',
    payload: handleAPI(url, method, false, Authorization)
  }

}

/*
*   GET ToDo
*
*   @todoid: (Intger)
*/
export function addToDo(data){

  const url           = '/'+API_VERSION+'/todos'
  const method        = 'POST'
  const locale        = localStorage.getItem('LOCALE')
  const Authorization = {'access-token':sessionStorage.getItem('TOKEN')}

  return {
    type: 'ADD_TODO',
    payload: handleAPI(url, method, data, Authorization)
  }

}


/*
*   Delete ToDo
*
*   @todoid: (Intger)
*/
export function deleteToDo(todoid){

  const url           = '/'+API_VERSION+'/todos/'+todoid
  const method        = 'DELETE'
  const locale        = localStorage.getItem('LOCALE')
  const Authorization = {'access-token':sessionStorage.getItem('TOKEN')}

  return {
    type: 'DELETE_TODO',
    payload: new Promise((resolve, reject) => {
      handleAPI(url, method, false, Authorization).then(() => {
        resolve(todoid)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

/*
*   EDIT ToDo
*
*   @todoid: (Intger)
*   @data: fromData
*/
export function editToDo(todoid, data){

  const url           = '/'+API_VERSION+'/todos/'+todoid
  const method        = 'PUT'
  const locale        = localStorage.getItem('LOCALE')
  const Authorization = {'access-token':sessionStorage.getItem('TOKEN')}

  return {
    type: 'EDIT_TODO',
    payload: handleAPI(url, method, data, Authorization)
  }

}
