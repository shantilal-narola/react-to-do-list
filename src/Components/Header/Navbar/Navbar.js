import React, {Component} from 'react'

import UserProfileBtn from './userProfileBtn/UserProfileBtn'
import './navStyle.css'

export default class Navbar extends Component{
  render(){
    const isLogged = (sessionStorage.getItem('TOKEN')) ? true : false
    return (
      <nav className={isLogged && "navbar navbar-toggleable-md navbar-light bg-faded fixed-top"}>
        {isLogged && <UserProfileBtn />}
      </nav>
    )
  }
}
