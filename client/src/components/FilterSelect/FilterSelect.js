import {
    FormControl,
    FormLabel,
    Typography,
    Select,
    MenuItem
} from "@material-ui/core";


function FilterSelect(props){

    return (
        <FormControl fullWidth color="primary">
            <FormLabel>
                <Typography variant="body2">
                    {props.name}
                </Typography>

            </FormLabel>
            <Select
                id="sortSelect"
                name={props.control.name}
                value={props.control.value}
                onChange={props.control.handler}
                color="secondary"
            >
                {
                    props.data.map((item, key) => {
                        return(
                            <MenuItem key={key} value={key}>{item}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}
export default FilterSelect;