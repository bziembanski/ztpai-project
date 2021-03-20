import {
    Paper,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    checkBoxGroupDescription:{
        display:"flex",
        flexDirection:"row",
        width:'100%',
        alignItems:"center",
        justifyContent:"space-between"
    },
    checkBoxGroupHeader:{
        width:'100%'
    },
    expandButton:{
        padding:theme.spacing(0)
    },
    formControl:{
        padding:theme.spacing(2)
    }
}));

function FilterCheckboxGroup(props){
    const checkboxes = Object.fromEntries(
        props.data.data.map(name => [name, true])
    )
    const [field, setField] = useState({
        ...checkboxes
    })
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleChange = (event) => {
        setField({
            ...field,
            [event.target.name]: !field[event.target.name]
        })
    }
    return (
        <FormControl fullWidth component={Paper} elevation={2} className={classes.formControl}>
            <FormLabel className={classes.checkBoxGroupHeader} color="secondary" component="legend">
                <Typography className={classes.checkBoxGroupDescription} variant="body2">
                    {props.data.name}
                    <IconButton className={classes.expandButton} onClick={()=>setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Typography>

            </FormLabel>
            <Collapse
                in={expanded}
            >
                <FormGroup>
                    {props.data.data.map((checkBox, key) => {
                        return(
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={field[checkBox]}
                                        name={checkBox}
                                        onChange={handleChange}
                                    />
                                }
                                label={checkBox}
                            />
                        );
                    })}
                </FormGroup>
            </Collapse>
        </FormControl>
    );
}
export default FilterCheckboxGroup;