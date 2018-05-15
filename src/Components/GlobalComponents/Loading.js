import React from 'react'
import $ from 'jquery'
// Style
import './css/Loading.css'

const Loading = (props) => {

  let alert   = (props.error) ? 'alert-danger' : (props.success) ? 'alert-success' : false
  let message = (alert) ? (props.error) ? props.error : props.success : false

  return (
    <div className="loading">
      <div className="icon">
        <div className="img">
          {alert ? (
            <div className={'alert '+alert} role="alert" style={{width: '50%', margin: 'auto'}}>
              {message}
            </div>
          ):(
            <img src="./images/loading.svg" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Loading
