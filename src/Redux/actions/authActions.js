import {handleAPI, API_VERSION} from '../../Utilities/handleAPI'

export function login(userData){

  const url     = '/'+ API_VERSION +'/login'
  const method  = 'POST'
  const locale  = localStorage.getItem('LOCALE')


  userData = {...userData, locale: locale}

  console.log(method);

  return {
    type: 'LOGIN_REQUEST',
    payload: handleAPI(url, method, userData)
  }

}


// On Success Login
export function onSuccessLogin(data){
  sessionStorage.setItem('TOKEN', data.auth_token)
  sessionStorage.setItem('EMAIL', data.users.email)
  sessionStorage.setItem('USERID', data.users.id)
}

export function initAuth(){
  return {
    type: 'INIT_AUTH',
    payload: new Promise((resolve, reject) => resolve(1))
  }
}

export function registration(userData){

  const url     = '/'+API_VERSION+'/signup'
  const method  = 'POST'
  const locale  = localStorage.getItem('LOCALE')

  userData = {...userData, locale: locale}

  return {
    type: 'REGISTRATION_REQUEST',
    payload: handleAPI(url, method, userData)
  }
}
