/*
* PageHeader: Compnent, display on the top of page content
*/

/********************
*   Import Packages
*********************/

// Main Packages
import React, { Component } from 'react'; // React & React component
import { Link }           from 'react-router-dom'

// Material UI
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Style
import './css/PageHeader.css'

class PageHeader extends Component{

  //render
  render(){
    return(
      <div className="page-header">
        <h2>
          {this.props.icon}
          {this.props.title}

          {this.props.addbtn &&
            <Link to={this.props.addbtn}>
              <FloatingActionButton mini={true} className="addBtn">
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          }

        </h2>
      </div>
    )
  }

}

export default PageHeader;
