import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Switch } from "react-router-dom"

// Authenticated Pages Routers
import ToDosRouters from './pagesRouters/ToDosRouters'

class AuthPagesRouters extends Component{

  render(){
    return (
      <div className="row clearfix">
        <ToDosRouters />
      </div>
    )
  }
}

export default AuthPagesRouters
