import axios from 'axios';
import {API_URL} from '../env'

const API_VERSION = 'v1'

const defaultHeader = {
  'Content-Type': 'application/json'
}

function handleAPI(url, method, data = null, Authorization = false, headers = defaultHeader){
  url = API_URL+url

  if(Authorization) Object.assign(headers, Authorization);

  return axios({
    method,
    url,
    data,
    headers,
  })
}

export {
  handleAPI,
  API_VERSION
}
