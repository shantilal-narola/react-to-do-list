import React, {Component} from 'react'

// Style
import './css/PagesContainer.css'



class PagesContainer extends Component{

  render(){
    const {children} = this.props
    return(
      <div className="col-lg-12 col-md-12 pt-3 page-content">
        {children}
      </div>
    )
  }
}

export default PagesContainer
