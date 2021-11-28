import {
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";


function FilterSelect(props) {
    return (
        <FormControl fullWidth color="primary" required={props.required}>
            <Typography variant="body2">
                <FormLabel>
                    {props.name}
                </FormLabel>
            </Typography>
            <Select
                id="sortSelect"
                name={props.control.name}
                value={props.control.value}
                onChange={props.control.handler}
                onOpen={props.control.onOpen}
                color="secondary"
                autoWidth
                disabled={props.control.disabled}
            >
                <MenuItem value="">
                    <em>{"⁬"}</em>
                </MenuItem>
                {
                    props.data.map((item, key) => {
                        return (
                            <MenuItem key={item.first ?? key}
                                      value={item.first ?? key}>{item.second ?? item}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}

export default FilterSelect;