import Paper from '@material-ui/core/Paper'
import {Box, Button, makeStyles, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import React, {useEffect, useState} from "react";
import axios from "axios";
import RedirectDialog from "../../components/RedirectDialog/RedirectDialog";
import {useHistory} from "react-router-dom";

axios.defaults.withCredentials = true;

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
    }
}));

function AddAnnouncementPage(props) {
    const history = useHistory();
    if (props.authorized === false) {
        history.push('/login');
    }
    const classes = useStyles();
    const [categories, setCategories] = useState({data: [], name: "Kategoria"});
    const [voivodeship, setVoivodeships] = useState({
        data: [],
        name: "Województwo"
    });
    const [county, setCounties] = useState({
        data: [],
        name: "Powiat"
    });
    const [commune, setCommunes] = useState({
        data: [],
        name: "Gmina"
    });
    const [locality, setLocality] = useState({
        data: [],
        name: "Miejscowość"
    });
    const [form, setForm] = useState({
        title: "",
        description: "",
        category_id: 0,
        wage: "",
        voivodeship: "",
        county: "",
        commune: "",
        locality: ""
    });
    const maxDescLength = 240;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [action, setAction] = useState('');

    const handleChange = (event) => {
        if (event.target.name === "description" && event.target.value.length <= maxDescLength) {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            });
        } else if (event.target.name !== "description") {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        } else if (event.target.name === "voivodeship") {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
                county: "",
                commune: "",
                locality: ""
            });
        } else if (event.target.name === "county") {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
                commune: "",
                locality: ""
            });
        } else if (event.target.name === "commune") {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
                locality: ""
            });
        }
        if (event.target.name === "voivodeship") {
            setCounties({
                ...county,
                data: []
            });
            setCommunes({
                ...commune,
                data: []
            });
            setLocality({
                ...locality,
                data: []
            });
        }
        if (event.target.name === "county") {
            setCommunes({
                ...commune,
                data: []
            });
            setLocality({
                ...locality,
                data: []
            });
        }
        if (event.target.name === "commune") {
            setLocality({
                ...locality,
                data: []
            });
        }
    };

    const handleOpenVoivodeships = event => {
        event.preventDefault()
        if (voivodeship.data.length === 0)
            axios.get('/api/locations')
                .then(voivodeships => {
                    setVoivodeships({
                        name: "Województwo", data: voivodeships.data ?? []
                    });
                })
                .catch(err => {
                    console.log(err);
                })
    }
    const handleOpenCounties = event => {
        event.preventDefault()
        if (county.data.length === 0)
            axios.get(`/api/locations/${form.voivodeship}`)
                .then(counties => {
                    setCounties({
                        name: "Powiat", data: counties.data ?? []
                    });
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const handleOpenCommunes = event => {
        event.preventDefault()
        if (commune.data.length === 0)
            axios.get(`/api/locations/${form.voivodeship}/${form.county}`)
                .then(communes => {
                    setCommunes({
                        name: "Gmina", data: communes.data ?? []
                    });
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const handleOpenLocalities = event => {
        event.preventDefault()
        if (locality.data.length === 0)
            axios.get(`/api/locations/${form.voivodeship}/${form.county}/${form.commune}`)
                .then(localities => {
                    setLocality({
                        name: "Miejscowość", data: localities.data ?? []
                    });
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/announcements', {
            ...form,
            category_id: form.category_id + 1,
            announcementType: {
                id: 1
            }
        })
            .then(data => {
                if (!data.data.hasOwnProperty('message')) {
                    setTitle("Ogłoszenie dodane pomyślnie");
                    setText("Ogłoszenie zostało wystawione na tablicę!");
                    setAction('/search');
                    setOpen(true);
                }
            })
            .catch(err => {
                setTitle("Problem z dodaniem ogłoszenia");
                if (err.response.data.hasOwnProperty("message"))
                    setText(err.response.data.message.map(message => {
                        return message + "\n"
                    }));
                setAction('/add-announcement');
                setOpen(true);
            });
    };

    useEffect(() => {
        axios.get('/api/categories')
            .then(categories => {
                setCategories({
                    name: "Kategoria", data: categories.data.map(el => {
                        return el.name
                    })
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

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
                                    required
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
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
                                    required
                                    name="description"
                                    label="Opis ogłoszenia"
                                    value={form.description}
                                    helperText={`${form.description.length}/${maxDescLength}`}
                                    onChange={handleChange}
                                    type="text"
                                    multiline
                                    rows={2}
                                    rowsMax={10}
                                    inputProps={{maxlength: maxDescLength}}
                                    fullWidth
                                    color="secondary"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <FilterSelect control={{
                                    name: "category_id",
                                    value: form.category_id,
                                    handler: handleChange
                                }} {...categories}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    required
                                    name="wage"
                                    label="Wynagrodzenie za godzinę"
                                    inputProps={{max: 999, min: 0}}
                                    value={form.wage}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                    color="secondary"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                            >
                                <FilterSelect control={{
                                    name: "voivodeship",
                                    value: form.voivodeship,
                                    handler: handleChange,
                                    onOpen: handleOpenVoivodeships
                                }} {...voivodeship}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                            >
                                <FilterSelect control={{
                                    name: "county",
                                    value: form.county,
                                    handler: handleChange,
                                    onOpen: handleOpenCounties,
                                    disabled: form.voivodeship === ""
                                }} {...county}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                            >
                                <FilterSelect control={{
                                    name: "commune",
                                    value: form.commune,
                                    handler: handleChange,
                                    onOpen: handleOpenCommunes,
                                    disabled: form.county === ""
                                }} {...commune}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                            >
                                <FilterSelect control={{
                                    name: "locality",
                                    value: form.locality,
                                    handler: handleChange,
                                    onOpen: handleOpenLocalities,
                                    disabled: form.commune === ""
                                }} {...locality}/>
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
            <RedirectDialog title={title} text={text} open={open}
                            setOpen={setOpen} action={action}/>
        </Grid>
    );
}

export default AddAnnouncementPage;