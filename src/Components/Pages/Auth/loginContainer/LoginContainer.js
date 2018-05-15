import React from 'react'

import Navbar from "../../../Header/Navbar/Navbar"

// style
import './loginContainerStyle.css'

const LoginContainer = (props) => {
  const {title, children} = props
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center login-container">
          <div className="col-lg-6 col-md-6 clearfix login-box">
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginContainer
