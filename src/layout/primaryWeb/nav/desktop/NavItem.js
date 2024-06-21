/* eslint-disable react/display-name */
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { forwardRef } from "react";
// next
import NextLink from "next/link";
// @mui
import { CardActionArea, Link } from "@mui/material";
// components
// import Image from '../../../../components/image';
// import Iconify from '../../../../components/iconify';
//
import Iconify from "@/components/iconify/Iconify";
import Image from "@/components/image/Image";
import { ListItem, ListSubItem } from "./styles";

// ----------------------------------------------------------------------

export const NavItem = forwardRef(
  (
    { item, open, isOffset, active, subItem, isExternalLink, value, ...other },
    ref
  ) => {
    const { title, path, children } = item;

    const renderContent = (
      <ListItem
        ref={ref}
        disableRipple
        isOffset={isOffset}
        subItem={subItem}
        active={active}
        open={open}
        value={value}
        {...other}
      >
        {title}

        {!!children && (
          <Iconify
            width={16}
            icon="eva:arrow-ios-downward-fill"
            sx={{ ml: 1 }}
          />
        )}
      </ListItem>
    );

    // ExternalLink
    if (isExternalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  }
);

NavItem.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  active: PropTypes.bool,
  subItem: PropTypes.bool,
  isOffset: PropTypes.bool,
  isExternalLink: PropTypes.bool,
};

export const NavSubItem = forwardRef(
  (
    { item, open, isOffset, active, subItem, isExternalLink, value, ...other },
    ref
  ) => {
    const { title, path, children } = item;

    const renderContent = (
      <ListSubItem
        ref={ref}
        disableRipple
        isOffset={isOffset}
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {title}

        {!!children && (
          <Iconify
            width={16}
            icon="eva:arrow-ios-downward-fill"
            sx={{ ml: 1 }}
          />
        )}
      </ListSubItem>
    );

    // ExternalLink
    if (isExternalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  }
);

NavSubItem.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  active: PropTypes.bool,
  subItem: PropTypes.bool,
  isOffset: PropTypes.bool,
  isExternalLink: PropTypes.bool,
};

// ----------------------------------------------------------------------

NavItemDashboard.propTypes = {
  item: PropTypes.object,
  sx: PropTypes.object,
};

export function NavItemDashboard({ item, sx, ...other }) {
  return (
    <Link
      component={NextLink}
      href={item.path}
      underline="none"
      sx={{ width: 1 }}
      {...other}
    >
      <CardActionArea
        sx={{
          py: 5,
          px: 10,
          minHeight: 400,
          borderRadius: 1,
          color: "text.disabled",
          bgcolor: "background.neutral",

          ...sx,
        }}
      >
        <m.div
          whileTap="tap"
          whileHover="hover"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
          }}
        >
          <Image
            visibleByDefault
            alt="illustration_dashboard"
            src="/assets/illustrations/illustration_dashboard.png"
          />
        </m.div>
      </CardActionArea>
    </Link>
  );
}
