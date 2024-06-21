import TextMaxLine from "@/components/text-max-line/TextMaxLine";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";

const CommonBlog = ({ data }) => {
  const router = useRouter();
  return (
    <>
      {data &&
        data.map((elem, index) => {
          console.log(elem, "dattaa");
          return (
            <Grid className="commonblog_grid_responsive" item md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "5px",
                  height: "430px",
                }}
              >
                <Box
                  component="img"
                  width="100%"
                  height={200}
                  sx={{ objectFit: "cover" }}
                  src={`${elem?.base_url}${elem?.image}`}
                  alt="blog"
                />
                <CardContent sx={{ height: "52%" }}>
                  <Stack height="100%" justifyContent="space-between">
                    <Stack spacing={1}>
                      <Box>
                        <Typography fontSize={18} fontWeight={600}>
                          {elem?.title}
                        </Typography>
                      </Box>

                      <Stack
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <Box>
                          <Avatar
                            sx={{
                              width: "23.59px",
                              height: "24.28px",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            component="h2"
                            fontSize={14}
                            fontWeight={500}
                          >
                            User Name
                          </Typography>
                        </Box>
                        <Box>
                          <Divider
                            sx={{
                              borderStyle: "dashed",
                              width: "50px",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            fontWeight={400}
                            fontSize={10}
                            component="h6"
                            color={(theme) => theme.palette.grey[500]}
                          >
                            {moment(elem?.created_at).format("MMM-DD-YYYY")}
                          </Typography>
                        </Box>
                      </Stack>
                      <Box>
                        <TextMaxLine
                          sx={{
                            fontSize: "12.19px",
                          }}
                          color={(theme) => theme.palette.grey[500]}
                          line={3}
                        >
                          {elem?.description}
                        </TextMaxLine>
                      </Box>
                    </Stack>

                    <Box sx={{ mt: 2 }}>
                      <Typography
                        color="primary"
                        onClick={() =>
                          router.push(`/blogs/blog_detail/${elem.slug}`)
                        }
                        fontWeight={600}
                        sx={{
                          cursor: "pointer",
                          position: "relative",
                          fontSize: "14.63px",
                          "&::after": {
                            content: '""',
                            position: "relative",
                            width: "65px",
                            height: "2px",
                            bottom: 0,
                            left: 0,
                            background: (theme) => theme.palette.dark.dark,
                            display: "block",
                            marginTop: 0.2,
                          },
                        }}
                      >
                        View Blog
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </>
  );
};

export default CommonBlog;
