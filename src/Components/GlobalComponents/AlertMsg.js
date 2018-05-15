import React from 'react'

const AlertMsg = (props) => {
  const {error, success} = props
  const alertClass = (success) ? 'alert-success' : 'alert-danger'
  const msg = (error) ? error : (success) ? success : ''
  return (
    <div className={'alert '+alertClass} role="alert">
      {msg}
    </div>
  )
}
export default AlertMsg
