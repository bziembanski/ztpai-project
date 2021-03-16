import {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    useMediaQuery,
    MenuList,
    MenuItem,
    IconButton,
    Drawer
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import {NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    menuLink: {
        textDecoration: 'none',
        margin: theme.spacing(0),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0),
        }
    },
    logo: {
        background: "white"
    },
    menuButtonWrapper: {
        flexGrow: 1,
    },
    menuWrapper: {
        display: "flex",
        flexDirection: 'row',
        flexGrow: 1
    },
    drawerPaper: {
        width: '70vw'
    },
    fullList: {
        width:"auto"
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
        if (event.type === 'keydown' &&(event.key === 'Tab' || event.key === 'Shift')) {
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
                    {isMobile ? (
                        <Container disableGutters={true} maxWidth="xl" className={classes.menuButtonWrapper}>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="secondary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={open}
                                onClose={toggleDrawer(false)}
                                classes={{paper: classes.drawerPaper}}
                            >
                                <div
                                    className={classes.fullList}
                                    role="presentation"
                                    onClick={toggleDrawer(false)}
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    <MenuList>
                                        {menuItems.map(item => {
                                            return (
                                                <NavLink className={classes.menuLink} to={item.pageUrl} key={item.menuTitle}>
                                                    <MenuItem>
                                                        <Typography color="secondary" variant="h6">
                                                            {item.menuTitle}
                                                        </Typography>
                                                    </MenuItem>
                                                </NavLink>
                                            );
                                        })}
                                    </MenuList>
                                </div>
                            </Drawer>
                        </Container>
                    ) : (
                        <Container disableGutters={true} maxWidth="xl" className={classes.menuWrapper}>
                            {
                                menuItems.map((item) => {
                                    return (
                                        <NavLink className={classes.menuLink} key={item.menuTitle} to={item.pageUrl}>
                                            <Typography color="secondary" variant="h6">
                                                {item.menuTitle}
                                            </Typography>
                                        </NavLink>
                                    )
                                })
                            }
                        </Container>
                    )
                    }
                    <NavLink to="/">
                        <img height={32} alt="logo-dibeda" src="/logo.svg"/>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

export default withRouter(Header);