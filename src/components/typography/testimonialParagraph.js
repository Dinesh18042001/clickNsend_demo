import React from 'react'
import { TypoParagraph } from './typoStyle'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialParagraph = ({ quoteColor, text, sx, className, ...rest }) => {
    return (
        <React.Fragment>
            <TypoParagraph {...rest} sx={sx} className={className} component="p" variant="body2"><FormatQuoteIcon color={quoteColor} sx={{ transform: "rotate(180deg)", position: "relative", top: "3px" }} />{text}<FormatQuoteIcon color={quoteColor} sx={{ position: "relative", top: "10px" }} /></TypoParagraph>
            
        </React.Fragment>
    )
}

export default TestimonialParagraph;