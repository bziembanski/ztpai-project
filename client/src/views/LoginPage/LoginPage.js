import React, {useState} from 'react';
import {Box, Button, makeStyles, TextField, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import RedirectDialog from "../../components/RedirectDialog/RedirectDialog";
import UserService from "../../services/UserService/UserService";


const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
            marginTop: 56
        },
        height: 'calc(100vh - 64px)',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
        overflow: "auto"
    },
    formGrid: {
        height: '70%',
    },
    fullHeight: {
        height: '100%',
    },
    signinLink: {
        [theme.breakpoints.down('xs')]: {
            order: 1
        }
    }
}));

function LoginPage(props) {
    const history = useHistory();
    const location = useLocation();
    if (props.authorized === true) {
        const {from} = location.state || {from: {pathname: "/"}};
        history.replace(from);
    }
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [action, setAction] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        UserService.login(username, password)
            .then(data => {
                console.log(data)
                console.log("logowanie")
                if (!data.hasOwnProperty('message')) {
                    props.setAuthorized(true);
                }
            })
            .catch(err => {
                console.log(err);
                setTitle("Problem z logowaniem");
                setText(err.response.data.message && err.response.data.message.map(message => {
                    return message + "\n"
                }));
                setAction('/login');
                setOpen(true);
            });
    }
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
                alignItems="center"
                justify="center"
                item
                xs={11}
                sm={10}
                md={7}
                lg={5}
                xl={3}
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
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    color="secondary"
                                    type="text"
                                    label="Login lub email"
                                    fullWidth/>
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
                                sm={7}
                                md={6}
                                lg={7}
                                className={classes.signinLink}
                            >
                                <NavLink to='/signin'>
                                    <Typography color="secondary" variant="subtitle2">
                                        Nie masz konta? Zarejstruj się!
                                    </Typography>
                                </NavLink>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                md={6}
                                lg={5}
                            >
                                <Button type="submit" fullWidth variant="contained" color="secondary">
                                    Zaloguj
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            <RedirectDialog title={title} text={text} open={open} setOpen={setOpen} action={action}/>
        </Grid>
    );
}

export default LoginPage;