import React, {Component} from 'react'
import { Route, Switch } from "react-router-dom"


import asyncComponent from '../../Components/GlobalComponents/AsyncComponent'

const IndexToDos   = asyncComponent(() => import('../../Components/Pages/ToDos/indexToDos/IndexToDos'))
const AddToDo   = asyncComponent(() => import('../../Components/Pages/ToDos/addToDo/AddToDo'))
const EditToDo     = asyncComponent(() => import('../../Components/Pages/ToDos/editToDo/EditToDo'))

class ToDosRouters extends Component{
  render(){
    const {permissions} = this.props
    return (
      <Switch>
          <Route path="/" exact component={IndexToDos} />
          <Route path="/todos/add" exact component={AddToDo} />
          <Route path="/todos/edit/:id" exact component={EditToDo} />
      </Switch>
    )
  }
}

export default ToDosRouters
