import Paper from '@material-ui/core/Paper'
import {Avatar, Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import Announcement from "../../components/Announcement/Announcement";
import anns from "../../anns";

const StyledRating = withStyles(({ palette }) => ({
    iconFilled: {
        color: palette.secondary.main,
    },
}))(Rating);

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{
            marginTop: 56
        },
        marginTop:64,
        backgroundColor:theme.palette.background.default,
        flexGrow:1,

    },
    ratings:{
        [theme.breakpoints.up('md')]:{
            marginTop:theme.spacing(3),
        }
    },
    userInfo:{
        marginTop:theme.spacing(3),
    },
    dashBoardElementTop:{
        flexGrow:1,
        flexWrap:"wrap",
        padding: theme.spacing(3),
    },
    rootChild:{
        padding:theme.spacing(3),
        height:'100%',
    },
    avatar:{
        width:150,
        height:150,
        marginBottom:theme.spacing(2)
    },
    ratingLabel:{
        display:"flex",
        alignItems:"center"
    },
    ratingContainer:{
        display:"flex",
        alignItems:"center"
    },
    profileHeader:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
    }
}));

function ProfilePage(){
    const classes = useStyles();
    return(
        <div style={{padding:25}}>
            <Grid
                container
                component="main"
                className={classes.root}
                justify="flex-start"
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    className={`${classes.dashBoardElementTop} ${classes.userInfo}`}
                >
                    <Paper
                        elevation={2}
                        className={classes.rootChild}
                    >
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                        >
                            <Avatar
                                className={classes.avatar}
                                variant="square">
                                R
                            </Avatar>

                        </Grid>
                        <Grid
                            item
                            container
                            justify="center"
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={7}
                            >
                                <Typography align="center" color="primary" variant="h5">
                                    Imię Nazwisko
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={7}
                            >
                                <Typography align="center" color="textPrimary" variant="h6">
                                    login
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    className={`${classes.dashBoardElementTop} ${classes.ratings}`}
                >
                    <Paper
                        elevation={2}
                        className={classes.rootChild}
                    >
                        <Grid
                            container
                            item
                            spacing={3}
                            justify="center"
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <Typography align="center" variant="h4" color="primary">
                                    Oceny
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                md={9}
                                lg={7}
                                className={classes.ratingContainer}
                                justify="space-between"
                            >
                                <Grid
                                    item
                                    className={classes.ratingLabel}
                                >
                                    <Typography variant="body1" align="left">Kompetentność</Typography>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <StyledRating
                                        precision={0.1}
                                        value={4.4}
                                        readOnly={true}
                                        size="large"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                md={9}
                                lg={7}
                                className={classes.ratingContainer}
                                justify="space-between"
                            >
                                <Grid
                                    item
                                    className={classes.ratingLabel}
                                >
                                    <Typography variant="body1" align="left">Życzliwość</Typography>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <StyledRating
                                        color="primary"
                                        precision={0.1}
                                        value={4.8}
                                        readOnly={true}
                                        size="large"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                md={9}
                                lg={7}
                                className={classes.ratingContainer}
                                justify="space-between"
                            >
                                <Grid
                                    item
                                    className={classes.ratingLabel}
                                >
                                    <Typography variant="body1" align="left">Zaradność</Typography>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <StyledRating
                                        color="primary"
                                        precision={0.1}
                                        value={3.5}
                                        readOnly={true}
                                        size="large"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.profileHeader}
                >
                    <Typography align="center" color="primary" variant="h4">Ogłoszenia</Typography>
                </Grid>
                {anns.map((ann, key) => {
                    return(
                        <Grid
                            key={key}
                            item
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                        >
                            <Announcement
                                title={ann.title}
                                date={ann.date}
                                description={ann.description}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
export default ProfilePage;