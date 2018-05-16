// API URLs related to evn
const env = {
  development: 'http://localhost:3000',
  production : 'https://rails-to-do-list-narola.herokuapp.com'
}

// hosts that will use this App
let hosts = {
 development: ['localhost'],
 production: ['react-to-do-list-narola.herokuapp.com'] 
}

const hostname = window.location.hostname
console.log(hostname);
export const current_env = Object.keys(hosts).filter(host => hosts[host].includes(hostname))
console.log(current_env);
export const API_URL = current_env.length != 0 ? env[current_env.toString()] : env.development
console.log(API_URL);
