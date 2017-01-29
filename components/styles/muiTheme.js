import { grey100, grey500, white, darkBlack } from 'material-ui/styles';
import Colors from './colors';
import { getMuiTheme } from 'material-ui/styles';

const muiTheme = {
  fontFamily: 'EJRoundedBook, Roboto, sans-serif',
  palette: {
    primary1Color: Colors.brandLight,
    primary2Color: Colors.brandLight,
    primary3Color: Colors.brandLight,
    accent1Color: Colors.brandLight,
    accent2Color: grey100, // #f5f5f5
    accent3Color: grey500, // #9e9e9e
    textColor: Colors.lightBlack, // rgba(0, 0, 0, 0.87)
    alternateTextColor: white,
    canvasColor: white,
    borderColor: Colors.lightGray, // #e0e0e0
    shadowColor: Colors.lightBlack,
  },
  appBar: {
    color: Colors.brandDark,
    textColor: white,
  },
  raisedButton: {
    primaryColor: Colors.darkBlue,
  },
  dropDownMenu: {
    accentColor: Colors.lightGray,
    color: Colors.lightBlack,
  },
  menu: {
    color: Colors.lightBlack,
  },
  snackbar: {
    backgroundColor: darkBlack,
  },
};

export default muiTheme;
