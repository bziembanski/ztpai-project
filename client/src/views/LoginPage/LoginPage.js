import { makeStyles, TextField, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root:{
        height: '100vh',
        backgroundColor:theme.palette.background.default,
    },
    formGrid:{
        height: '70%',
    },
    fullHeight:{
        height:'100%',
    }
}));

function LoginPage(props){
    const classes = useStyles();
    return(
        <Grid 
            container
            component="main" 
            className={classes.root} 
            alignItems="center" 
            justify="center"
        >
            <Grid 
                item
                xs={12} 
                sm={8} 
                md={5}
                className={classes.formGrid}  
            >
                <Paper 
                    elevation={3}
                    square 
                    className={classes.fullHeight} >
                    <Box height={'100%'} p={3}>
                        <form
                            className={classes.fullHeight}
                            autoComplete="on"
                        >
                            <TextField type="text" label="Username" variant="outlined" />
                        </form>
                    </Box>
                    
                </Paper>

            </Grid>
        </Grid>
    )
}
export default LoginPage;