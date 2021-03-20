import {
    FormControl,
    FormLabel,
    Typography,
    Select,
    MenuItem
} from "@material-ui/core";
import {useState} from "react";


function FilterSelect(props){
    const [select, setSelect] = useState();
    const handleChange = (event) => {
        setSelect(event.target.value);
    }
    return (
        <FormControl fullWidth color="primary">
            <FormLabel>
                <Typography variant="body2">
                    {props.data.name}
                </Typography>

            </FormLabel>
            <Select
                id="sortSelect"
                name="select"
                value={select}
                defaultValue={0}
                onChange={handleChange}
                color="secondary"
            >
                {
                    props.data.data.map((item, key) => {
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