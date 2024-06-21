import {
  List,
  ListItem,
  ListItemButton, Typography
} from "@mui/material";
import { StyledListItemText } from "./footerStyle";
import Link from "next/link";

const SectionTwo = () => {
  return (
    <>
      <List>
        <ListItem>
          <Typography fontSize={20} fontWeight={600}>
            Website Links
          </Typography>
        </ListItem>
        <ListItemButton component={Link} href="/aboutus">
          <StyledListItemText primary="About us" />
        </ListItemButton>
        <ListItemButton component={Link} href="/testimonial/testimonials">
          <StyledListItemText primary="Testimonials" />
        </ListItemButton>
        <ListItemButton component={Link} href="/faqs">
          <StyledListItemText primary="Faq" />
        </ListItemButton>
        <ListItemButton component={Link} href="/contact_us">
          <StyledListItemText primary="Contact us" />
        </ListItemButton>
        <ListItemButton component={Link} href="/privacy_policy">
          <StyledListItemText primary="Privacy Policy" />
        </ListItemButton>
        <ListItemButton component={Link} href="/term_and_condition">
          <StyledListItemText primary="Term & Condition" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SectionTwo;
