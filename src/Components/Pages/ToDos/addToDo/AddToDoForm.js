/*
* AddToDoForm: Object
* Child of: AddToDo
*/

// Main Packages
import React, {Component} from 'react'

// External Packages
import {Loading} from '../../../GlobalComponents/GlobalComponents'

// Material UI
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import { ValidatorForm, TextValidator, SelectValidator, DateValidator} from 'react-material-ui-form-validator'

import Checkbox from 'material-ui/Checkbox';


// External Packages
import $ from 'jquery'

// Style
import './addToDo.css'


class AddToDoForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: false,
      form: {},
    }

    this.handleChangeField = this.handleChangeField.bind(this)
  }

  handleChangeField(event){
    const { form } = this.state;
    form[event.target.name] = event.target.value
    this.setState({ form })
  }


  render(){
    const { form } = this.state

    return(
      <ValidatorForm ref="form" onSubmit={this.props.handleSubmit} className="add-todo">

        {this.state.loading && <Loading />}

        <div className="form-field">
          <TextValidator
              floatingLabelText="Data"
              onChange={this.handleChangeField}
              name="data"
              value={form.data? form.data : ''}
              style={{width: '100%'}}
              validators={['required']}
              errorMessages={['this field is required']}
            />
        </div>

        <div className="form-field">
          <DateValidator

              hintText="Due Date"
              container="inline"
              name="due_date"
              mode="landscape"
              style={{color: 'rgb(56, 143, 233)'}} />
        </div>

        <div className="form-field">
          <TextValidator
            floatingLabelText="Priority"
            onChange={this.handleChangeField}
            name="priority"
            type="number"
            value={form.priority}
            style={{width: '100%'}}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </div>



      <div className="form-field submit">
        <RaisedButton label="Create To Do" type="submit" primary={true} />
      </div>

      </ValidatorForm>
    )
  }

}
export default AddToDoForm;
