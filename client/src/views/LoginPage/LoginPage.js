import {useState} from 'react';
import { makeStyles, TextField, Box, Button } from '@material-ui/core';
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

function LoginPage(){
    const classes = useStyles();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const url = "http://localhost:3001/login"
        const dataObject = {login, password}
        console.log(dataObject);
        const requestOption = {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataObject)
        };
        fetch(url, requestOption)
            .then(res => {
                return res.json()
            })
            .then(json => console.log(json));
    }
    return(
        <Grid 
            container
            component="main" 
            className={classes.root} 
            alignItems="center" 
            justify="center"
        >
            <Grid
                container
                alignItems="center"
                justify="center"
                item
                xs={11}
                sm={8} 
                md={6}
                className={classes.formGrid}  
            >
                <Paper
                    elevation={3}
                    square 
                >
                    <Box height={'100%'} p={4}>
                        <Grid
                            spacing={4}
                            alignItems="center"
                            justify="flex-end"
                            container
                            component="form"
                            autoComplete="on"
                            onSubmit={handleSubmit}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                            >
                                <TextField
                                    required
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
                                    color="secondary"
                                    type="text"
                                    label="Login lub email"
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                            >
                                <TextField
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    color="secondary"
                                    type="password"
                                    label="Hasło"
                                    fullWidth/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <Button type="submit" fullWidth variant="contained" color="secondary">
                                    Zaloguj
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </Paper>

            </Grid>
        </Grid>
    )
}
export default LoginPage;