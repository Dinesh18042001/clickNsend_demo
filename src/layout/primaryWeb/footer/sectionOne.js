import Iconify from "@/components/iconify/Iconify";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  List,
  ListItem, Stack,
  Typography
} from "@mui/material";
import { StyledListItemText } from "./footerStyle";
const SectionOne = () => {
  return (
    <>
      <List>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOnIcon fontSize="large" sx={{ color: "common.black" }} />{" "}
          <StyledListItemText
            primary="United Kingdom"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "600",
                color: "common.black",
              },
            }}
          />
        </Stack>
        <ListItem>
          <Typography fontSize={14} color="#535353">
            Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in
            suscipit turpis enim cursus vulputate amet. Lobortis mi platea
            aliquam senectus tempus mauris neque.
          </Typography>
        </ListItem>
        <ListItem>
          <Stack direction="column">
            <Typography fontSize={14} fontWeight={700} color="#535353">
              Call us:
              <Typography
                component="span"
                fontSize={14}
                fontWeight={400}
                ml={0.6}
                color="#535353"
              >
                0123456789
              </Typography>
            </Typography>
            <Typography fontSize={14} fontWeight={700} color="#535353">
              Mail us:
              <Typography
                component="span"
                fontSize={14}
                fontWeight={400}
                ml={0.6}
                color="#535353"
              >
                info@abcd.co.uk
              </Typography>
            </Typography>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction="row" spacing={1}>
          <Iconify icon="ic:baseline-facebook" width={24}/>
          <Iconify icon="ri:instagram-fill"  width={24}/>
          <Iconify icon="entypo-social:linkedin-with-circle"  width={24} />
          </Stack>
        </ListItem>
      </List>
    </>
  );
};

export default SectionOne;
