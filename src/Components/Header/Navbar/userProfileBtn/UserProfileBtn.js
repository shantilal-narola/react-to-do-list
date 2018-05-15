/*
* App: the main component
* Child from Navbar
*/

/********************
*   Import Packages
*********************/

// Main Packages
import React,{Component} from 'react'; // React & React component

import { Link }           from 'react-router-dom'

// Material UI
import Avatar       from 'material-ui/Avatar';
import FlatButton   from 'material-ui/FlatButton';
import Popover      from 'material-ui/Popover';
import MenuItem     from 'material-ui/MenuItem';
import AssignmentIcon   from 'material-ui/svg-icons/action/assignment-ind';
import KeyboardReturn from 'material-ui/svg-icons/hardware/keyboard-return'

// Style
import './userProfileStyle.css'

class UserProfileBtn extends Component{

  constructor(props){
    super(props)
    this.state = {
      open: false, // for open and close the menu
    }

    this.handleLogout = this.handleLogout.bind(this)
  }


  // handle Open Menu
  handleTouchTap = (event) => {

    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })

  }

  // handle Close Menu
  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  handleLogout(e){
    e.preventDefault()
    sessionStorage.removeItem('TOKEN')
    window.location.reload()
  }


  //render
  render(){
    const session_img = sessionStorage.getItem('USER_IMG')
    const admin_img   = session_img ? session_img : 'images/user-avatar.png'
    return (
      <FlatButton className="user-profile-btn" style={{height: '50px', padding: '3px 10px', margin: '0 0 0 auto'}} onTouchTap={this.handleTouchTap}>
        <span className="nav-username">
          {sessionStorage.getItem('EMAIL')}
        </span>

        {/*User Profile Menu*/}
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={{width: '200px'}}
        >

          {/* Menu List */}
            <MenuItem primaryText="Logout" leftIcon={<KeyboardReturn />} onClick={this.handleLogout} />
          {/* /End Menu List */}

        </Popover>
        {/* /End User Profile Menu*/}
      </FlatButton>
    )

  }

}


export default UserProfileBtn
