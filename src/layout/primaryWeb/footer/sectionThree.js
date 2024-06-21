import {
  List,
  ListItem,
  ListItemButton, Typography
} from "@mui/material";
import { StyledListItemText } from "./footerStyle";

const SectionThree = () => {
  return (
    <>
      <List>
        <ListItem>
          <Typography fontSize={20} fontWeight={600}>
            Services
          </Typography>
        </ListItem>
        <ListItemButton component="a" href="/blogs">
          <StyledListItemText primary="Blogs" />
        </ListItemButton>
        <ListItemButton component="a" href="/testimonial/testimonials">
          <StyledListItemText primary="Testimonials" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SectionThree;
