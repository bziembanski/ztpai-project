import {useState} from 'react';
import {
    AppBar,
    Toolbar,
    useMediaQuery,
} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import DesktopNavItems from "../NavItems/DesktopNavItems";
import MobileNavItems from "../NavItems/MobileNavItems";

const useStyles = makeStyles((theme) => ({
    menuLink: {
        textDecoration: 'none',
        margin: theme.spacing(0),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0),
        },
        color:"inherit"
    },
    logo: {
        background: "white"
    },
    menuButtonWrapper: {
        flexGrow: 1,
    },
    cancelButtonWrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
    },
    menuWrapper: {
        display: "flex",
        flexDirection: 'row',
        flexGrow: 1
    },
    drawerPaper: {
        width: 300
    },
    fullList: {
        width:"auto"
    },
    iconButton:{
        '& svg': {
            fontSize: 48
        }
    }
}));

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Header() {
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };


    const menuItems = [
        {
            menuTitle: 'Główna',
            pageUrl: "/"
        },
        {
            menuTitle: 'Ogłoszenia',
            pageUrl: "/search"
        },
        {
            menuTitle: 'Profil',
            pageUrl: "/profile"
        },
        {
            menuTitle: 'Dodaj ogłoszenie',
            pageUrl: "/addannouncement"
        }
    ];

    return (
        <HideOnScroll>
            <AppBar color="inherit">
                <Toolbar>
                    { isMobile
                        ?
                            <MobileNavItems
                                classes={classes}
                                menuItems={menuItems}
                                toggleDrawer={toggleDrawer}
                                open={open}
                            />
                        :
                            <DesktopNavItems
                                classes={classes}
                                menuItems={menuItems}
                            />
                    }
                    <NavLink to="/">
                        <img height={32} alt="logo-dibeda" src="/logo.svg"/>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}

export default withRouter(Header);