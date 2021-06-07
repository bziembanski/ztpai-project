import {useState} from 'react';
import {AppBar, Toolbar, useMediaQuery,} from '@material-ui/core';
import {NavLink, withRouter} from "react-router-dom";
import {useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {getCookie} from '../../utils/Utils';

import DesktopNavItems from "../NavItems/DesktopNavItems";
import MobileNavItems from "../NavItems/MobileNavItems";
import axios from "axios";


function HideOnScroll(props) {
    const {children, window} = props;
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
    const [authorized, setAuthorized] = [props.authorized, props.setAuthorized]

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const logout = () => {
        axios.post('/api/users/logout', {})
            .then(() => {
                setAuthorized(false);
            })
            .catch();
    }


    const menuItems =
        authorized
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
                    pageUrl: `/profile/${JSON.parse(getCookie("user").substr(2)).id}`
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
                    {isMobile
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