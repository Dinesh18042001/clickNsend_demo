import { Heading } from "@/components/typography";
import { List, ListItemButton } from "@mui/material";
import { StyledListItemText } from "./footerStyle";

const SectionTwo = () => {
  return (
    <>
      <Heading
        heading="Useful Links"
        isPositionLeft={true}
        sx={{
          fontSize: "20px!important",
          textAlign: "left",
          px: { lg: 2, md: 2, sm: 0, xs: 0 },
          color:"#555555!important"

        }}
      />
      <List>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Jobs" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Help" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Faq" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Contact us" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SectionTwo;
