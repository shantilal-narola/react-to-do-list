import React from 'react'
import './css/Breadcrumb.css'
import { Link } from 'react-router-dom'

const Breadcrumb = (props) => {
  const paths = props.path

  return (
  <ol className="breadcrumb">
    {/* <li className="breadcrumb-item"><Link to="/"  >Home</Link></li>*/}
    {paths.map((path, key) => {
      let active = ((key + 1) === paths.length) ? 'active' : false
      let pathLink = active ? path : <Link to={'/'}>{path}</Link>
      return (<li key={'path'+key} className={'breadcrumb-item '+active}>{pathLink}</li>)
    })}
  </ol>
  )
}
export default Breadcrumb
