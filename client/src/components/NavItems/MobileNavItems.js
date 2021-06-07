import {NavLink} from "react-router-dom";
import {Container, Drawer, IconButton, MenuItem, MenuList, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuLink: {
        textDecoration: 'none',
        margin: theme.spacing(0),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0),
        },
        color: "inherit",
    },
    menuButtonWrapper: {
        flexGrow: 1,
    },
    cancelButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    drawerPaper: {
        width: theme.drawerWidth
    },
    iconButton: {
        '& svg': {
            fontSize: 32
        }
    }
}));

function MobileNavItems(props) {
    const classes = useStyles();
    return (
        <>
            <Container disableGutters={true} className={classes.menuButtonWrapper}>
                <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="menu"
                    onClick={props.toggleDrawer(true)}
                    className={classes.iconButton}
                >
                    <MenuIcon/>
                </IconButton>
            </Container>
            <Drawer
                anchor="left"
                open={props.open}
                onClose={props.toggleDrawer(false)}
                classes={{paper: classes.drawerPaper}}
            >
                <Container
                    disableGutters={true}
                    className={classes.cancelButtonWrapper}
                >
                    <IconButton
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        onClick={props.toggleDrawer(false)}
                        className={classes.iconButton}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Container>
                <MenuList>
                    {props.menuItems.map(item => {
                        return item.menuTitle !== "Wyloguj"
                            ? (
                                <NavLink
                                    className={classes.menuLink}
                                    to={item.pageUrl}
                                    key={item.menuTitle}
                                    onClick={props.toggleDrawer(false)}
                                    onKeyDown={props.toggleDrawer(false)}
                                >
                                    <MenuItem>
                                        <Typography color="secondary" variant="h5">
                                            {item.menuTitle}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            )
                            : (
                                <MenuItem
                                    key={item.menuTitle}
                                    className={classes.menuLink}
                                    onClick={props.logout}>
                                    <Typography color="secondary" variant="h5">
                                        {item.menuTitle}
                                    </Typography>
                                </MenuItem>
                            );
                    })}
                </MenuList>
            </Drawer>
        </>
    );
}

export default MobileNavItems;