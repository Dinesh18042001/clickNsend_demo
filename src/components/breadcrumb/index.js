import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const BreadcrumbComponent = () => {
  const { asPath } = useRouter();

  const linkPath = asPath.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  return (
    <Breadcrumbs
      mt={2}
      aria-label="breadcrumb"
      sx={{
        color: (theme) => theme.palette.common.white,
        fontSize: {
          lg: "1rem!important",
          md: "1rem!important",
          sm: "0.7rem!important",
          xs: "0.7rem!important",
        },
      }}
    >
      <NextLink href="/" legacyBehavior>
        <Link
          underline="hover"
          color="common.white"
          sx={{
            cursor: "pointer",
            fontSize: {
              lg: "1rem!important",
              md: "1rem!important",
              sm: "0.7rem!important",
              xs: "0.7rem!important",
            },
          }}
        >
          Home
        </Link>
      </NextLink>

      {pathArray &&
        pathArray.map((path, index) => {
          if (index == pathArray.length - 1) {
            return (
              <Typography
                key={`breadcrumb-${index}`}
                
                sx={{
                  textTransform: "uppercase",
                  
                  color: (theme) => theme.palette.common.white,
                  
                  fontSize: {
                    lg: "1rem!important",
                    md: "1rem!important",
                    sm: "0.7rem!important",
                    xs: "0.7rem!important",
                  },
                
                }}
                color="text.secondary"
              >
                {path && path?.breadcrumb?.indexOf("-") !== -1
                  ? path.breadcrumb.replace(/-/g, " ")
                  : path.breadcrumb}
              </Typography>
            );
          } else {
            return (
              <NextLink
                key={`breadcrumb-${index}`}
                href={path.href}
                legacyBehavior
              >
                <Link
                  sx={{ textTransform: "capitalize" }}
                  underline="hover"
                  color="inherit"
                >
                  {path.breadcrumb}
                </Link>
              </NextLink>
            );
          }
        })}
    </Breadcrumbs>
  );
};
