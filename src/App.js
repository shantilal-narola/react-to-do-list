// Main Packages
import React, { Component } from 'react'; // React & React component
import { HashRouter as Router } from "react-router-dom"

// Components
import MaterialUiProvider from './Theme/MaterialUiProvider'
import RootRouters from './Routers/RootRouters'

// Style
import './Theme/style.css'

// External Packages
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'mdi/css/materialdesignicons.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'sweetalert/dist/sweetalert.min.js'
import 'sweetalert/dist/sweetalert.css'

class App extends Component {
  render() {
    return (
      <MaterialUiProvider>
        <Router>
            <RootRouters />
        </Router>
      </MaterialUiProvider>
    );
  }
}

export default App;
