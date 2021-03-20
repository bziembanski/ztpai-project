import {
    FormControl,
    FormLabel,
    Typography,
    Slider,
    Tooltip
} from "@material-ui/core";
import PropTypes from 'prop-types';
import {useState} from "react";

function valuetext(value) {
    return `${value} zł`;
}

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip color="secondary" open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

function FilterSelect(props){
    const [slider, setSlider] = useState(props.data.data.value);
    const handleChange = (event, newValue) => {
        setSlider(newValue);
    }
    return (
        <FormControl fullWidth color="primary">
            <FormLabel>
                <Typography variant="body2">
                    {props.data.name}
                </Typography>

            </FormLabel>
            <Slider
                color="secondary"
                min={props.data.data.min}
                max={props.data.data.max}
                step={props.data.data.step}
                value={slider}
                onChange={handleChange}
                valueLabelDisplay="auto"
                ValueLabelComponent={ValueLabelComponent}
                getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
            />
        </FormControl>
    );
}
export default FilterSelect;