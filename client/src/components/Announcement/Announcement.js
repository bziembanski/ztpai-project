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

const useStyles = makeStyles((theme) => ({
    actionText: {
        [theme.breakpoints.down("xs")]:{
            marginLeft: 4
        },
        marginLeft: theme.spacing(1)
    }
}));

function Announcement(props){
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardHeader disableTypography={true}
                avatar={<Avatar variant="square">R</Avatar>}
                title={
                    <Typography variant="body1" color="primary" component="p">
                        {props.title}
                    </Typography>}
                subheader={props.date}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                    {props.description}
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