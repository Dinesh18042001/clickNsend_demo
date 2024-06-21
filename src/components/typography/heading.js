import React from 'react';
import { TypoHeading } from './typoStyle'
import { Box } from '@mui/material';

const Heading = ({ heading, sx, className, isPositionLeft, ...rest }) => {
    return (
        <React.Fragment>
            <Box>
                <TypoHeading isPositionLeft={isPositionLeft} {...rest} sx={sx} className={className} component="h3" variant="h3">{heading}</TypoHeading>
            </Box>
        </React.Fragment>
    )
}

export default Heading