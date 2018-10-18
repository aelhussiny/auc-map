import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Default Palette: https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
//Default Theme: https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js

const theme = getMuiTheme({
  fontFamily: 'Amiri, sans-serif',
  letterSpacing: '1px',
  borderRadius: 0,
  fontSize: '18px',
  palette: {
    primary1Color: "#0E6DAC",
    primary2Color: "#0E6DAC",
    primary3Color: "#0E6DAC",
    accent1Color: "#0E6DAC",
    accent2Color: "#0E6DAC",
    accent3Color: "#5F259F",
    textColor: "#75787B",
    secondaryTextColor: "#A7A8AA",
    // alternateTextColor: white,
    // canvasColor: white,
    borderColor: "#E3E3E3",
    // disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: "#3A383B"
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack
  }
});

export default theme;
