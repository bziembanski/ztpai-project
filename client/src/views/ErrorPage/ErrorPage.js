import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
        textAlign: 'center'
    },
    big: {
        color: theme.palette.primary.dark
    },
    errorPaper: {
        height: '70%',
        flexDirection: 'column'
    }
}));

function ErrorPage() {
    const classes = useStyles();
    return (
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="center"
            justify="center"
        >
            <Grid
                container
                item
                xs={11}
                sm={9}
                md={8}
                component={Paper}
                elevation={3}
                className={classes.errorPaper}
                alignItems="center"
                justify="center"
            >
                <Typography className={classes.big} variant="h1">404</Typography>
                <Typography variant="h5">
                    Wygląda na to, że się zgubiłeś 🤭
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ErrorPage;