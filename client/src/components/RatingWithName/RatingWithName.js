import {Grid, Typography, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Rating} from "@material-ui/lab";

const StyledRating = withStyles(({ palette }) => ({
    iconFilled: {
        color: palette.secondary.main,
    },
}))(Rating);

const useStyles = makeStyles(() => ({
    ratingLabel:{
        display:"flex",
            alignItems:"center"
    },
}));

function RatingWithName(props){
    const classes = useStyles();
    return(
        <Grid
            container
            justify="space-between"
        >
            <Grid
                item
                className={classes.ratingLabel}
            >
                <Typography variant="body1" align="left">{props.name}</Typography>
            </Grid>
            <Grid
                item
            >
                <StyledRating
                    color="primary"
                    precision={0.1}
                    value={props.value}
                    readOnly={true}
                    size="large"
                />
            </Grid>
        </Grid>
    );
}
export default RatingWithName;