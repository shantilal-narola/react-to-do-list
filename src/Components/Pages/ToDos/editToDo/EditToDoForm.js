/*
* AddToDoForm: Object
* Child of: AddToDo
*/

// Main Packages
import React, {Component} from 'react'

// Material UI
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { ValidatorForm, TextValidator, SelectValidator, DateValidator} from 'react-material-ui-form-validator'

import Checkbox from 'material-ui/Checkbox';

// External Packages
import {Loading} from '../../../GlobalComponents/GlobalComponents'

import './editToDo.css'
// External Packages
import $ from 'jquery'


class EditToDoForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      form: {},
      data: this.props.todo.todos.data,
      due_date: this.props.todo.todos.due_date,
      priority: this.props.todo.todos.priority,
    }
    this.handleChangeField = this.handleChangeField.bind(this);
  }

  componentWillMount(){

    //name
    const { form } = this.state;
    form['data'] = this.state.data;
    form['due_date'] = this.state.due_date;
    form['priority'] = this.state.priority;
    this.setState({ form });
  }

  handleChangeField(event){
    const { form } = this.state;
    form[event.target.name] = event.target.value
    this.setState({ form })
  }

  render(){
    const {todo} = this.props;

    const { form, data, due_date, priority } = this.state

    return(
      <ValidatorForm ref="form" onSubmit={this.props.handleSubmit} className="add-todo">

        {this.state.loading && <Loading />}

        <div className="form-field">
          <TextValidator
              floatingLabelText="Data"
              onChange={this.handleChangeField}
              name="name"
              defaultValue={data? data : ''}
              style={{width: '100%'}}
            />
        </div>

        <div className="form-field">
          <DatePicker
              required
              hintText="Due Date"
              container="inline"
              name="due_date"
              mode="landscape"
              defaultDate={new Date(due_date)}
              style={{color: 'red'}} />
        </div>

        <div className="form-field">
            <TextField
              required
              hintText="Priority"
              style={{width: '100%'}}
              type="number"
              name="priority"
              defaultValue={priority}
            />
          </div>


      <div className="form-field submit">
        <RaisedButton label="Update ToDo" type="submit" primary={true} />
      </div>

      </ValidatorForm>
    )
  }
}

export default EditToDoForm;
