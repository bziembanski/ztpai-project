import {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Box, Button, makeStyles, TextField, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";

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
    },
    signinLink:{
        [theme.breakpoints.down('xs')]:{
            order:1
        }
    }
}));

function SignInPage(){
    const classes = useStyles();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const url = "http://localhost:3001/signin"
        const dataObject = {name, surname, login, email, password, password2}
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
                sm={10}
                md={7}
                lg={5}
                xl={4}
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
                                sm={6}
                            >
                                <TextField
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    color="secondary"
                                    type="text"
                                    label="Imię"
                                    fullWidth />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <TextField
                                    required
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    color="secondary"
                                    type="text"
                                    label="Nazwisko"
                                    fullWidth />
                            </Grid>
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
                                    label="Login"
                                    fullWidth />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                            >
                                <TextField
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    color="secondary"
                                    type="text"
                                    label="Email"
                                    fullWidth />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
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
                                <TextField
                                    required
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    color="secondary"
                                    type="password"
                                    label="Powtórz hasło"
                                    fullWidth/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={7}
                                lg={7}
                                className={classes.signinLink}
                            >
                                <NavLink to='/login'>
                                    <Typography color="secondary" variant="subtitle2">
                                        Masz już konto? Zaloguj się!
                                    </Typography>
                                </NavLink>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                lg={5}
                            >
                                <Button type="submit" fullWidth variant="contained" color="secondary">
                                    Zarejestruj się
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default SignInPage;