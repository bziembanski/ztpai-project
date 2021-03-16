import {NavLink} from "react-router-dom";
import {Container, Typography} from "@material-ui/core";

function DesktopNavItems(props){
    return(
        <Container disableGutters={true} maxWidth="xl" className={props.classes.menuWrapper}>
            {
                props.menuItems.map((item) => {
                    return (
                        <NavLink className={props.classes.menuLink} key={item.menuTitle} to={item.pageUrl}>
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
export default DesktopNavItems;