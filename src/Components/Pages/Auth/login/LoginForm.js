import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link }           from 'react-router-dom'

// Material UI
import RaisedButton         from 'material-ui/RaisedButton'
import FlatButton           from 'material-ui/FlatButton'

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class LoginForm extends Component{

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
            errorMessages={['this field is required', 'email is not valid']}
          />

        <TextValidator
            floatingLabelText="Password"
            onChange={this.handleChange}
            name="password"
            type="password"
            value={form.password}
            style={{width: '100%'}}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        <div className="actions">
          <RaisedButton type="submit" label="Enter" primary={true}  className="submit-btn" />

            <Link to="/registration">
              <FlatButton label="Registration" />
            </Link>
        </div>
      </ValidatorForm>
    )
  }
}

// proptypes onSubmit
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default LoginForm
