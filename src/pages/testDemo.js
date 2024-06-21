import { Button, Fade, Paper, Popper, Typography } from '@mui/material';
import React from 'react';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const TestDemo = () => {
    const [state, setState] = React.useState("");


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };




    const handleChange = (address) => {
        console.log("address", address)
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    console.log("statestatestate", state)
    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Button onClick={handleClick('top-start')}>top-start</Button>
        </>
    )
}

export default TestDemo