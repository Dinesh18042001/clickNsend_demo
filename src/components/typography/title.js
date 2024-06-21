import React from 'react'
import { TypoTitle } from './typoStyle'

const Title = ({ title, sx, className, ...rest }) => {
    return (
        <React.Fragment>
            <TypoTitle {...rest} sx={sx} className={className} component="h5" variant="h5">{title}</TypoTitle>
        </React.Fragment>
    )
}

export default Title;