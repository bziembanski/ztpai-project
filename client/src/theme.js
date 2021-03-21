import {unstable_createMuiStrictModeTheme as createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let customTheme = createMuiTheme({
    palette:{
        type:'light',
        primary:{
            main: '#7e58a7'
        },
        secondary:{
            main: '#585aa7'
        }
    },
    typography: {
        fontFamily:[
            'Comfortaa',
            'Roboto'
        ]
    },
    drawerWidth:350
})

customTheme = responsiveFontSizes(customTheme);

export default customTheme;