import {Avatar, Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PanToolIcon from "@material-ui/icons/PanTool";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import {Skeleton} from "@material-ui/lab";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    actionText: {
        [theme.breakpoints.down("xs")]: {
            marginLeft: 4
        },
        marginLeft: theme.spacing(1)
    },
    root: {
        width: '100%',
        height: 285,
        display: "flex",
        flexDirection: "column"
    },
    desc: {
        minHeight: 40,
        overflowWrap: "break-word"
    },
    descContainer: {
        flexGrow: 1
    },
    profileLink: {
        textDecoration: "none"
    }
}));

function Announcement(props) {
    const classes = useStyles();
    const {loading = false} = props;

    return (
        <Card className={classes.root} elevation={2}>
            <CardHeader disableTypography={true}
                        avatar={
                            loading ? (
                                <Skeleton width={40} height={40} animation="wave" variant="rect"/>
                            ) : (
                                <NavLink className={classes.profileLink} to={`/profile/${props.user.id}`}>
                                    <Avatar variant="square">
                                        {props.user.avatar
                                            ? <img alt="avatar" src={props.user.avatar}/>
                                            : props.user.name[0]
                                        }
                                    </Avatar>
                                </NavLink>
                            )
                        }
                        title={
                            <Typography variant="body1" color="primary" component="p">
                                {
                                    loading ? (
                                        <Skeleton animation="wave" variant="rect"/>
                                    ) : (
                                        props.title
                                    )
                                }
                            </Typography>
                        }
                        subheader={
                            loading ? (
                                <Skeleton width={100} animation="wave" variant="rect" style={{marginTop: 5}}/>
                            ) : (
                                props.date
                            )

                        }
            />
            <CardContent className={classes.descContainer}>
                <Typography className={classes.desc} variant="body2" color="textPrimary" component="p">
                    {
                        loading ? (
                            <>
                                <Skeleton animation="wave" variant="rect"/>
                                <Skeleton animation="wave" variant="rect" style={{marginTop: 10, marginBottom: 10}}/>
                                <Skeleton animation="wave" variant="rect"/>
                            </>

                        ) : (
                            props.description
                        )
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="secondary">
                    <PanToolIcon/>
                    <Typography
                        className={classes.actionText}
                        variant="button"
                    >
                        Chętny
                    </Typography>
                </Button>
                <Button color="secondary">
                    <ModeCommentIcon/>
                    <Typography
                        className={classes.actionText}
                        variant="button"
                    >
                        Napisz
                    </Typography>
                </Button>
                <Button color="secondary">
                    <CloseIcon/>
                    <Typography
                        className={classes.actionText}
                        variant="button"
                    >
                        Odrzuć
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
}

export default Announcement;