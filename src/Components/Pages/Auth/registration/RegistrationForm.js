import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link }           from 'react-router-dom'

// Material UI
import RaisedButton         from 'material-ui/RaisedButton'
import FlatButton           from 'material-ui/FlatButton'

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class RegistrationForm extends Component{

  constructor(props) {
    super(props)

    this.state = {
      form : {}
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { form } = this.state;
    form[event.target.name] = event.target.value
    this.setState({ form })
  }

  render(){
    const {onSubmit} = this.props
    const { form } = this.state

    return(
      <ValidatorForm
                  ref="form"
                  onSubmit={onSubmit}
                  >

        <TextValidator
            floatingLabelText="Email"
            onChange={this.handleChange}
            name="email"
            value={form.email}
            style={{width: '100%'}}
            validators={['required', 'isEmail']}
            errorMessages={"this_field_is_required", "email_is_not_valid"}
          />

        <TextValidator
            floatingLabelText="Password"
            onChange={this.handleChange}
            name="password"
            type="password"
            value={form.password}
            style={{width: '100%'}}
            validators={['required']}
            errorMessages={"this_field_is_required"}
          />

        <TextValidator
            floatingLabelText="Password Confirmation"
            onChange={this.handleChange}
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            style={{width: '100%'}}
            validators={['required']}
            errorMessages={"this_field_is_required"}
          />

        <div className="actions">
          <RaisedButton type="submit" label="Register" primary={true}  className="submit-btn" />

          <Link to="/login">
            <FlatButton label='Login' />
          </Link>
        </div>
      </ValidatorForm>
    )
  }
}

// proptypes onSubmit
RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default RegistrationForm
