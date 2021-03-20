import {
    Drawer,
    IconButton,
    Paper,
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FilterCheckboxGroup from "../FilterCheckboxGroup/FilterCheckboxGroup";
import FilterSelect from "../FilterSelect/FilterSelect";
import FilterSlider from "../FilterSlider/FilterSlider";

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
        maxWidth:'100%',
        padding:theme.spacing(2)
    },
}));

function FilterDrawer(props){
    const filtersData = [
        {
            type:"select",
            name:"Sortowanie",
            data:[
                "Odległość rosnącą",
                "Odległość malejąco",
                "Wynagrodzenie rosnąco",
                "Wynagrodzenie malejąco"
            ]
        },
        {
            type:"slider",
            name:"Wynagrodzenie za godzinę",
            data:{
                min:0,
                max:150,
                step:5,
                value:[0, 100]
            }
        },
        {
            type:"checkbox",
            name:"Kategorie",
            data:[
                "mechanika",
                "ogrodnictwo",
                "elektryka",
                "budownictwo"
            ]
        },
    ];
    const classes = useStyles();
    const isDrawerOpen = props.isDrawerOpen;
    const filterDrawerHandler = props.filterDrawerHandler
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
            <Grid container spacing={3} className={classes.filtersWrapper} justify="flex-start" alignItems="center">
                {
                    filtersData.map((filter, key) => {
                        if(filter.type === "select"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                >
                                    <FilterSelect data={filter}/>
                                </Grid>
                            );
                        }
                        else if(filter.type === "checkbox"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                >
                                    <FilterCheckboxGroup data={filter}/>
                                </Grid>
                            );
                        }
                        else if(filter.type === "slider"){
                            return(
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                >
                                    <FilterSlider data={filter}/>
                                </Grid>
                            );
                        }
                        else{return ("");}
                    })
                }
            </Grid>

        </Drawer>
    );
}
export default FilterDrawer;