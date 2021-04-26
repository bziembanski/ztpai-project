import {
    Drawer,
    IconButton,
    Paper,
    Typography,
    Grid,
    makeStyles,
    TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FilterCheckboxGroup from "../FilterCheckboxGroup/FilterCheckboxGroup";
import FilterSelect from "../FilterSelect/FilterSelect";
import FilterSlider from "../FilterSlider/FilterSlider";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    filterDrawer:{
        width:theme.drawerWidth
    },
    filterDrawerHeader:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:theme.spacing(2),
        ...theme.mixins.toolbar
    },
    iconButton:{
        '& svg': {
            fontSize: 32
        }
    },
    filtersWrapper:{
        padding:theme.spacing(2)
    },
    filtersElement:{
        marginBottom:theme.spacing(3)
    },
}));

function FilterDrawer(props){
    const filtersData = props.filters;
    const classes = useStyles();
    const isDrawerOpen = props.isDrawerOpen;
    const filterDrawerHandler = props.filterDrawerHandler;
    const checkboxes = Object.fromEntries(
        filtersData[2].data.map(name => [name, true])
    );
    const [form, setForm] = useState({
        searchBox:"",
        sort:0,
        wage:[0,100],
        category:checkboxes,
    })

    const handleChange = (name) => (event, value) => {
        if(name === "wage"){
            setForm({
                ...form,
                [name]: value
            })
        }
        else if(event.target.type === "checkbox"){
            setForm({
                ...form,
                category: {
                    ...form.category,
                    [event.target.name]:!form.category[event.target.name]
                }
            })
        }
        else {
            setForm({
                ...form,
                [name]: event.target.value
            })
        }
    }
    return(
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={filterDrawerHandler(false)}
            classes={{paper: classes.filterDrawer}}
        >
            <Paper
                elevation={3}
                className={classes.filterDrawerHeader}
            >
                <Typography variant="h6" color="secondary">
                    Filtruj/Sortuj
                </Typography>
                <IconButton
                    className={classes.iconButton}
                    color="secondary"
                    onClick={filterDrawerHandler(false)}>
                    <CloseIcon/>
                </IconButton>
            </Paper>
            <Grid
                container
                className={classes.filtersWrapper}
                justify="flex-start"
                alignItems="center">

                <Grid
                    item
                    xs={12}
                    className={classes.filtersElement}
                >
                    <TextField
                        fullWidth
                        name="searchBox"
                        label={<Typography variant="body2">Szukaj</Typography>}
                        value={form.searchBox}
                        onChange={handleChange("searchBox")}/>
                </Grid>
                {
                    filtersData.map((filter, key) => {
                        if(filter.type === "select"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    className={classes.filtersElement}
                                >
                                    <FilterSelect control={{name:"sort", value: form.sort, handler: handleChange("sort")}} {...filter}/>
                                </Grid>
                            );
                        }
                        else if(filter.type === "checkbox"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    className={classes.filtersElement}
                                >
                                    <FilterCheckboxGroup control={{value: form.category, handler: handleChange("category")}} {...filter}/>
                                </Grid>
                            );
                        }
                        else if(filter.type === "slider"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    className={classes.filtersElement}
                                >
                                    <FilterSlider control={{value: form.wage, handler: handleChange("wage")}} {...filter}/>
                                </Grid>
                            );
                        }
                        else {
                            return ("");
                        }
                    })
                }
            </Grid>
        </Drawer>
    );
}
export default FilterDrawer;