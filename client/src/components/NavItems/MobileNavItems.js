import {NavLink} from "react-router-dom";
import {Container, Drawer, IconButton, MenuItem, MenuList, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";

function MobileNavItems(props){
    const styles= makeStyles((theme) => ({

    }));
    return(
        <>
            <Container disableGutters={true} maxWidth="xl" className={props.classes.menuButtonWrapper}>
                <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="menu"
                    onClick={props.toggleDrawer(true)}
                    className={props.classes.iconButton}
                >
                    <MenuIcon/>
                </IconButton>
            </Container>
            <Drawer
                anchor="left"
                open={props.open}
                onClose={props.toggleDrawer(false)}
                classes={{paper: props.classes.drawerPaper}}
            >
                <Container
                    disableGutters={true}
                    className={props.classes.cancelButtonWrapper}
                >
                    <IconButton
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        onClick={props.toggleDrawer(false)}
                        size="large"
                        className={props.classes.iconButton}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Container>
                <MenuList>
                    {props.menuItems.map(item => {
                        return (
                            <NavLink
                                className={props.classes.menuLink}
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
                        );
                    })}
                </MenuList>
            </Drawer>
        </>
    )
}
export default MobileNavItems;