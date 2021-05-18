import {useState} from 'react';
import {
    AppBar,
    Toolbar,
    useMediaQuery,
} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import DesktopNavItems from "../NavItems/DesktopNavItems";
import MobileNavItems from "../NavItems/MobileNavItems";
import axios from "axios";



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

function Header(props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const logout = () => {
        axios.post('api/users/logout', {})
            .then(data=>{
                if(data.status===200){
                    props.setAuthorized(false);
                }
            });
    }


    const menuItems =
        props.authorized
        ? [
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
                pageUrl: "/add-announcement"
            },
            {
                menuTitle: 'Wyloguj',
                pageUrl: "/logout"
            }
        ]
        : [
            {
                menuTitle: 'Główna',
                pageUrl: "/"
            },
            {
                menuTitle: 'Ogłoszenia',
                pageUrl: "/search"
            },
            {
                menuTitle: 'Logowanie',
                pageUrl: "/login"
            },
            {
                menuTitle: 'Rejestracja',
                pageUrl: "/signin"
            }
        ];

    return (
        <HideOnScroll>
            <AppBar color="inherit">
                <Toolbar>
                    { isMobile
                        ?
                            <MobileNavItems
                                menuItems={menuItems}
                                toggleDrawer={toggleDrawer}
                                open={open}
                                logout={logout}
                            />
                        :
                            <DesktopNavItems
                                menuItems={menuItems}
                                logout={logout}
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