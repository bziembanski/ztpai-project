import {
    AppBar,
    Toolbar,
    Drawer,
    useMediaQuery,
    Typography
} from '@material-ui/core';

import {NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    menuLink:{
        textDecoration:'none',
        color: '#fafafa',
        margin: theme.spacing(3)
    }
}));

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Header(props){
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const menuItems=[
        {
            menuTitle: 'Głowna',
            pageUrl: "/"
        },
        {
            menuTitle: 'Zaloguj się',
            pageUrl: "/login"
        },
        {
            menuTitle: 'Brak strony',
            pageUrl: "/brak"
        }
    ];

    return(
        <HideOnScroll>
            <AppBar>
                <Toolbar>
                    {
                        menuItems.map((item) => {
                            return(
                                <NavLink className={classes.menuLink} key={item.menuTitle} to={item.pageUrl}>
                                    <Typography variant="h5">
                                        {item.menuTitle}
                                    </Typography>
                                </NavLink>
                            )
                        })
                    }
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}
export default withRouter(Header);