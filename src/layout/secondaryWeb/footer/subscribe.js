import SubscribeButton from "@/components/button/subscribeButton";
import {
  Box, CardContent,
  Container,
  Stack,
  Typography
} from "@mui/material";

const Subscribe = () => {
  return (
    <Box sx={{ background: (theme) => theme.palette.primary.main }}>
      <Container>
        <CardContent sx={{ paddingBottom: "24px!imporatant" }}>
          <Stack
            justifyContent="space-between"
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            alignItems="center"
            spacing={{ md: 0, sm: 2, xs: 2 }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: (theme) => theme.palette.common.white }}
              >
                Subscribe Our Newsletter
              </Typography>
            </Box>
            <Box>
              <SubscribeButton />
            </Box>
          </Stack>
        </CardContent>
      </Container>
    </Box>
  );
};

export default Subscribe;
