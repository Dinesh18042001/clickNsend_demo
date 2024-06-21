import React from 'react'
import { TypoParagraph } from './typoStyle'

const Paragraph = ({ text, sx, className, ...rest }) => {
    return (
        <React.Fragment>
            <TypoParagraph {...rest} sx={sx} className={className} component="p" variant="body2">{text}</TypoParagraph>
        </React.Fragment>
    )
}

export default Paragraph;