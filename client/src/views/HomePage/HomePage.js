import Paper from '@material-ui/core/Paper'
import {
    Divider,
    Grid,
    IconButton,
    InputBase,
    makeStyles,
    Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Announcement from "../../components/Announcement/Announcement";
import announcements from "../../anns";

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{
            marginTop: 56
        },
        marginTop:64,
        backgroundColor:theme.palette.background.default,
        overflow: "auto"
    },
    searchBox:{
        marginTop:theme.spacing(3),
        padding:theme.spacing(1),
        paddingLeft:theme.spacing(2),
        display: 'flex',
    },
    divider: {
        height: 40,
        margin: 4,
    },
    input:{
        flexGrow:1,
        paddingRight:theme.spacing(1),
    },
    heading:{
        fontWeight: "bold",
        marginBottom:theme.spacing(2)
    },
    newestAnnouncementsContainer:{
        marginTop:theme.spacing(4),
        padding:theme.spacing(2),
        backgroundColor:theme.palette.background.paper
    },
    announcementsContainer:{
        [theme.breakpoints.down("sm")]:{
            justifyContent:"center"
        },
        justifyContent:"flex-start"
    }
}));

function HomePage(){
    const classes = useStyles();
    return(
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
            justify="center"
        >
            <Grid
                item
                xs={11}
                md={7}
                lg={5}
                elevation={2}
                component={Paper}
                className={classes.searchBox}
            >
                <InputBase
                    className={classes.input}
                    placeholder="Szukaj"
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Grid>
            <Grid
                className={classes.newestAnnouncementsContainer}
                item
                container
                xs={12}
                justify="center"
            >
                <Typography
                    variant="h5"
                    color="primary"
                    className={classes.heading}
                >
                    Najnowsze ogłoszenia
                </Typography>
                <Grid
                    className={classes.announcementsContainer}
                    item
                    container
                    spacing={3}
                    xs={12}
                    alignItems="flex-start"
                    justify="flex-start"
                >
                    {
                        announcements.map((ann, key) => {
                            return(
                                <Grid
                                    xs={12}
                                    sm={10}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    key={key}
                                    item
                                >
                                    <Announcement
                                        title={ann.title}
                                        date={ann.date}
                                        description={ann.description}
                                    />
                                </Grid>
                            );
                        })
                    }

                </Grid>

            </Grid>

        </Grid>
    );
}
export default HomePage;