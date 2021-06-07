import {NavLink} from "react-router-dom";
import {Container, Typography} from "@material-ui/core";
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
    menuWrapper: {
        display: "flex",
        flexDirection: 'row',
        flexGrow: 1
    },
    logoutLink: {
        margin: theme.spacing(0),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0),
        },
        cursor: "pointer"
    }
}));


function DesktopNavItems(props) {
    const classes = useStyles();
    return (
        <Container disableGutters={true} maxWidth="xl" className={classes.menuWrapper}>
            {
                props.menuItems.map((item) => {
                    return item.menuTitle !== "Wyloguj"
                        ? (
                            <NavLink className={classes.menuLink} key={item.menuTitle} to={item.pageUrl}>
                                <Typography color="secondary" variant="h6">
                                    {item.menuTitle}
                                </Typography>
                            </NavLink>
                        )
                        : (
                            <Typography key={item.menuTitle} onClick={props.logout} className={classes.logoutLink}
                                        color="secondary" variant="h6">
                                {item.menuTitle}
                            </Typography>
                        );
                })
            }
        </Container>
    )
}

export default DesktopNavItems;