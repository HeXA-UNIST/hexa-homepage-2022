// react
import { useRef, useState } from "react";

// mui
import { Paper, Box, InputBase, TextField, Switch, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


const StyledInputField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(props.useSwitch == null || props.defaultActive ? true : false);

    const valueRef = useRef(null);

    const handleOnChange = (value) => {
        valueRef.current = value;
        props.onChange(value);
    }

    const handleSwitchChange = (event) => {
        setIsActive(event.target.checked);
        if (props.onActiveChange != null) {
            props.onActiveChange(event.target.checked,
                valueRef.current ? valueRef.current :
                    props.type === "date" ? new Date() :
                        props.type === "text" ? "" : null
            );
        }
    }

    return (<Paper
        elevation={isHovered | isFocused ? 1 : 0}
        sx={{
            ...props.sx,
            height: '56px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '8px',
            borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
            borderStyle: 'solid',
            borderWidth: isFocused ? '1.2px' : '0.8px',
        }}
        onMouseEnter={
            () => setIsHovered(true)
        }
        onMouseLeave={
            () => setIsHovered(false)
        }
    >
        <Box sx={{
            height: '100%',
            padding: '0 10px',
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isFocused ? '#f0f0f5' : '#f4f4f4',
            borderRadius: '8px 0px 0px 8px',
            borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
            borderStyle: 'solid',
            borderWidth: isFocused ? '0px 1.2px 0px 0px' : '0px 0.8px 0px 0px',
            transition: 'background-color 0.2s',
        }}>
            <Box sx={{
                stroke: isHovered | isFocused ? '#000000FF' : '#000000A5',
                color: isHovered | isFocused ? '#000000FF' : '#000000A5',
                strokeWidth: 1,
                textSize: '14px',
            }} >
                <Typography>
                    {props.leading}
                </Typography>
            </Box>
            {props.useSwitch && <Switch onChange={handleSwitchChange} />}
        </Box>
        {
            props.type === undefined || props.type === null || props.type === 'text' ?
                <InputText isActive={isActive} setIsFocused={setIsFocused}
                    onChange={handleOnChange} hint={props.hint} defaultValue={props.initialValue} /> :
                props.type === "date" ?
                    <InputDate isActive={isActive} onChange={handleOnChange} setIsFocused={setIsFocused}
                        defaultValue={props.initialValue} />
                    : null
        }

    </Paper >);
}

const InputText = (props) => {
    return (<InputBase disabled={!props.isActive} sx={{ flex: "1", ml: '18px', mr: '18px', fontSize: '14px' }}
        defaultValue={props.defaultValue}
        placeholder={props.hint} onChange={(e) => props.onChange(e.target.value)}
        onFocus={
            () => props.setIsFocused(true)
        }
        onBlur={
            () => props.setIsFocused(false)
        }
    >
    </InputBase>);
}

const InputDate = (props) => {
    const [selectedDate, setSelectedDate] = useState(props.defaultValue ?? new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        props.onChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} sx={{ flex: "1", ml: '18px', mr: '18px', fontSize: '14px' }}>
            <DatePicker
                disabled={!props.isActive}
                sx={{ width: '100%' }}
                defaultValue={props.defaultValue}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        sx={{ width: '100%', padding: '0px 20px' }}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                        }}
                        onFocus={
                            () => props.setIsFocused(true)
                        }
                        onBlur={
                            () => props.setIsFocused(false)
                        }
                    />
                }
            />
        </LocalizationProvider>
    );
}

export default StyledInputField;