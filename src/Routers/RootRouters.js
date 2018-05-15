import React from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom"

import navPagesRouter from './pagesRouters/navPagesRouter'
import AuthPagesRouters from './AuthPagesRouters'
import Navbar from '../Components/Header/Navbar/Navbar'



const RootRouters = () => {
  const isLogged = (sessionStorage.getItem('TOKEN')) ? true : false
  return (
    <div className="container-fluid h-100 clearfix">
      <Navbar />

      {isLogged ? (
        <AuthPagesRouters />
      ):(
        <div>
          <Redirect to="/login" />
          {navPagesRouter}
        </div>

      )}


    </div>
  )
}
export default RootRouters
