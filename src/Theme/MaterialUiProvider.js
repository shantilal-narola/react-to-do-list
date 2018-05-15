import React, {Component} from 'react'

// Material Ui
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme            from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin   from 'react-tap-event-plugin';

class MaterialUiProvider extends Component{

  constructor(props){
    super(props)
    this.muiTheme = getMuiTheme({
      palette: {
        primary1Color: "rgb(56, 143, 233)",
        primary2Color: "#2173B3",
        accent1Color: "rgb(56, 143, 233)",
      },

      appBar: {
        height: 50,
      },

      datePicker: {
        selectColor: "red",
      },


    })
  }

  componentWillMount(){
    injectTapEventPlugin()
  }

  render() {

   return (
       <MuiThemeProvider muiTheme={this.muiTheme}>
        {this.props.children}
       </MuiThemeProvider>
   )
 }
}

export default MaterialUiProvider
