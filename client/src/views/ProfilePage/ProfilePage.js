import Paper from '@material-ui/core/Paper'
import {Avatar, Grid, makeStyles, Typography} from "@material-ui/core";
import RatingWithName from "../../components/RatingWithName/RatingWithName";
import Announcement from "../../components/Announcement/Announcement";
import {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import UserService from "../../services/UserService/UserService";
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
    profileHeader:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
    },
    progress:{
        [theme.breakpoints.down('sm')]:{
            width:'95%',
        },
        [theme.breakpoints.up('md')]:{
            width:'60%',
        },
        [theme.breakpoints.up('lg')]:{
            width:'42%',
        },
        margin:"auto",
        marginTop:theme.spacing(2)
    },
}));

function ProfilePage(props){
    const { id } = useParams();
    const classes = useStyles();
    const [isAnnsLoading, setIsAnnsLoading] = useState(true);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [profile, setProfile] = useState();

    useEffect(() => {
        setIsAnnsLoading(true);
        setIsProfileLoading(true);
        UserService.user(id)
            .then(_profile => {
                setAnnouncements(_profile.announcements);
                setProfile(() => {
                    return (({ announcements, ...us }) => us)(_profile);
                });
                UserService.userRatings(id)
                    .then(_ratings => {
                        setProfile(p => {
                            return {ratings: _ratings, ...p}
                        });
                    })
                    .catch(err => {
                        if(err.response.status === 500){
                            props.setAuthorized(false);
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setIsProfileLoading(false);
                        }, 500);
                    });
            })
            .catch(err => {
                if(err.response.status === 500){
                    props.setAuthorized(false);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setIsAnnsLoading(false);
                }, 0);
            });

        return () => {
            setProfile({});
            setAnnouncements([]);
        };
    }, [id]);

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
                            {
                                isProfileLoading ? (
                                    <Skeleton animation="wave" variant="rect" className={classes.avatar} />
                                ) : (
                                    <Avatar
                                        className={classes.avatar}
                                        variant="square">
                                        {
                                            <img alt={profile.name[0]} src={profile.avatar}/>
                                        }
                                    </Avatar>
                                )
                            }
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
                                    {
                                        isProfileLoading ? (
                                            <Skeleton animation="wave" variant="rect"/>
                                        ) : (
                                            `${profile.name} ${profile.surname}`
                                        )
                                    }
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={7}
                            >
                                <Typography align="center" color="textPrimary" variant="h6">
                                    {
                                        isProfileLoading ? (
                                            <Skeleton animation="wave" variant="rect"/>
                                        ) : (
                                            profile.username
                                        )
                                    }
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
                                lg={7}
                                direction="column"
                                spacing={2}
                            >
                                {
                                    isProfileLoading ? (
                                        <>
                                            <Grid item ><Skeleton animation="wave" variant="rect" width='100%' height={20}/></Grid>
                                            <Grid item><Skeleton animation="wave" variant="rect" width='100%' height={20}/></Grid>
                                            <Grid item><Skeleton animation="wave" variant="rect" width='100%' height={20}/></Grid>
                                        </>
                                    ) : (
                                        profile.ratings.map((rating, key) => <Grid key={key} item><RatingWithName  {...rating} /></Grid>)
                                    )
                                }
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
                {
                    isAnnsLoading ? (
                        [1,2,3,4].map((key) => {
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Announcement
                                        loading
                                    />
                                </Grid>
                            );
                        })
                    ) : (
                        announcements.map((ann, key) => {
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Announcement
                                        user={profile}
                                        title={ann.title}
                                        date={ann.date}
                                        description={ann.description}
                                    />
                                </Grid>
                            );
                        })
                    )
                }
            </Grid>
        </div>
    );
}
export default ProfilePage;