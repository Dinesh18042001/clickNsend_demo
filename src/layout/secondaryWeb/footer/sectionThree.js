import { Heading } from "@/components/typography";
import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { StyledListItemText } from "./footerStyle";

const SectionThree = () => {
  return (
    <>
      <Heading
        heading="Links"
        isPositionLeft={true}
        sx={{
          fontSize: "20px!important",
          textAlign: "left",
          px: { lg: 2, md: 2, sm: 0, xs: 0 },
          color:"#555555"
        }}
      />
      <List>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Blogs" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="News" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <StyledListItemText primary="Testimonials" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SectionThree;
