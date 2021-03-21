import {
    FormControl,
    FormLabel,
    Typography,
    Slider,
    Tooltip
} from "@material-ui/core";
import PropTypes from 'prop-types';

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
    return (
        <FormControl fullWidth color="primary">
            <FormLabel>
                <Typography variant="body2">
                    {props.name}
                </Typography>

            </FormLabel>
            <Slider
                color="secondary"
                min={props.data.min}
                max={props.data.max}
                step={props.data.step}
                value={props.control.value}
                onChange={props.control.handler}
                valueLabelDisplay="auto"
                ValueLabelComponent={ValueLabelComponent}
                getAriaValueText={valuetext}
            />
        </FormControl>
    );
}
export default FilterSelect;