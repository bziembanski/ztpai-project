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
                xs={11}
                sm={8} 
                md={6}
                className={classes.formGrid}  
            >
                <Paper 
                    elevation={3}
                    square 
                    className={classes.fullHeight} >
                    <Box height={'100%'} p={3}>
                        <Grid
                            container
                            component="form"
                            autoComplete="on"
                            spacing={2}
                            fullWidth
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <TextField type="text" label="Imię" fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <TextField type="text" label="Nazwisko" fullWidth/>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </Paper>

            </Grid>
        </Grid>
    )
}
export default LoginPage;