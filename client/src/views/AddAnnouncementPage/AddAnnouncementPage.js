import Paper from '@material-ui/core/Paper'
import {Box, Button, makeStyles, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import filters from "../../filters";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{
            height: 'calc(100vh - 56px)',
            marginTop: 56
        },
        height: 'calc(100vh - 64px)',
        marginTop:64,
        backgroundColor:theme.palette.background.default,
        overflow: "auto"
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

function AddAnnouncementPage(){
    const classes = useStyles();
    const [form, setForm] = useState({
        title:"",
        description:"",
        category:0,
        wage:undefined
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: [event.target.value]
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        const url = "http://localhost:3001/signin"
        const dataObject = {...form}
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
                    <Box p={4}>
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
                            >
                                <TextField
                                    name="title"
                                    label="Tytuł ogłoszenia"
                                    type="text"
                                    fullWidth
                                    color="secondary"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    name="description"
                                    label="Opis ogłoszenia"
                                    type="text"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    color="secondary"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <FilterSelect control={{name:"category", value: form.category, handler: handleChange}} {...filters[2]}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    name="wage"
                                    label="Wynagrodzenie za godzinę"
                                    inputProps={{max:999, min:0}}
                                    type="number"
                                    fullWidth
                                    color="secondary"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={5}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Dodaj ogłoszenie
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default AddAnnouncementPage;