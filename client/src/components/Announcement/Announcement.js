import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    makeStyles,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PanToolIcon from "@material-ui/icons/PanTool";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    actionText: {
        [theme.breakpoints.down("xs")]:{
            marginLeft: 4
        },
        marginLeft: theme.spacing(1)
    },
    root:{
        width:'100%',
    },
    desc:{
        minHeight:40
    }
}));

function Announcement(props){
    const classes = useStyles();
    const {loading = false} = props;
    return(
        <Card className={classes.root} elevation={2}>
            <CardHeader disableTypography={true}
                avatar={
                    loading ? (
                        <Skeleton width={40} height={40} animation="wave" variant="rect"/>
                    ) : (
                        <Avatar variant="square"><img alt={props.user.name[0]} src={props.user.avatar}/></Avatar>
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
                        <Skeleton width={100} animation="wave" variant="rect" style={{marginTop:5}}/>
                    ) : (
                        props.date
                    )

                }
            />
            <CardContent>
                <Typography className={classes.desc} variant="body2" color="textPrimary" component="p">
                    {
                        loading ? (
                            <>
                                <Skeleton animation="wave" variant="rect"/>
                                <Skeleton animation="wave" variant="rect" style={{marginTop:10, marginBottom:10}}/>
                                <Skeleton animation="wave" variant="rect"/>
                            </>

                        ) : (
                            props.description
                        )
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="primary">
                    <PanToolIcon/>
                    <Typography
                        className={classes.actionText}
                        variant="button"
                    >
                        Chętny
                    </Typography>
                </Button>
                <Button color="primary">
                    <ModeCommentIcon />
                    <Typography
                        className={classes.actionText}
                        variant="button"
                    >
                        Napisz
                    </Typography>
                </Button>
                <Button color="primary">
                    <CloseIcon />
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