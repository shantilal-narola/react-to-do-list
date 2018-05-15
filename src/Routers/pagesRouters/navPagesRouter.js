import React from 'react'
import { Route, Switch } from "react-router-dom"

import asyncComponent from '../../Components/GlobalComponents/AsyncComponent'

// Login Components
const Login           = asyncComponent(() => import('../../Components/Pages/Auth/login/Login'))
const Registration    = asyncComponent(() => import('../../Components/Pages/Auth/registration/Registration'))



const navPagesRouter = (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/registration" component={Registration} />
  </Switch>
)
export default navPagesRouter
