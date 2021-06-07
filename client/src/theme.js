import {responsiveFontSizes, unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';

let customTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#9a6ccc'
        },
        secondary: {
            main: '#878bff'
        }
    },
    typography: {
        fontFamily: [
            'Comfortaa',
            'Roboto'
        ]
    },
    drawerWidth: 350
})

customTheme = responsiveFontSizes(customTheme);

export default customTheme;