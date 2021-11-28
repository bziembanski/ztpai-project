import {
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    checkBoxGroupDescription: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkBoxGroupHeader: {
        width: '100%'
    },
    expandButton: {
        padding: theme.spacing(1)
    },
    formControl: {
        padding: theme.spacing(2)
    }
}));

function FilterCheckboxGroup(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    return (
        <FormControl fullWidth component={Paper} elevation={2} className={classes.formControl}>
            <FormLabel className={classes.checkBoxGroupHeader} color="secondary" component="legend">
                <Typography className={classes.checkBoxGroupDescription} variant="body2">
                    {props.name}
                    <IconButton className={classes.expandButton} onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Typography>

            </FormLabel>
            <Collapse
                in={expanded}
            >
                <FormGroup>
                    {props.data.map((checkBox) => {
                        return (
                            <FormControlLabel
                                key={checkBox.first}
                                control={
                                    <Checkbox
                                        value={checkBox.first}
                                        name={checkBox.second}
                                        checked={props.control.value[checkBox.second].checked}
                                        onChange={props.control.handler}
                                    />
                                }
                                label={checkBox.second}
                            />
                        );
                    })}
                </FormGroup>
            </Collapse>
        </FormControl>
    );
}

export default FilterCheckboxGroup;