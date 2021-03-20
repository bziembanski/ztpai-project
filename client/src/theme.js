import {createMuiTheme} from '@material-ui/core/styles';

const customTheme = createMuiTheme({
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

export default customTheme;