import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Stack, Fade, Portal } from "@mui/material";
// hooks
// import useActiveLink from '../../../../hooks/useActiveLink';
//
import { NavItem, NavItemDashboard, NavSubItem } from "./NavItem";
import { StyledSubheader, StyledMenu } from "./styles";
import useActiveLink from "@/hooks/useActiveLink";
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";

// ----------------------------------------------------------------------

NavList.propTypes = {
  item: PropTypes.object,
  isOffset: PropTypes.bool,
};

export default function NavList({ item, isOffset }) {
  const { pathname } = useRouter();

  const [openMenu, setOpenMenu] = useState(true);

  const { path, children } = item;

  const { active, isExternalLink } = useActiveLink(path, false);

  const isMobile = useResponsive("down", "md");
  const responsiveHeight = isMobile ? 78.5 : 52;
  const value = useOffSetTop(10, {
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = () => {
    if (children) {
      setOpenMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };


  return (
    <>
      <NavItem
        item={item}
        isOffset={isOffset}
        active={active}
        open={openMenu}
        isExternalLink={isExternalLink}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        value={value}
      />

      {!!children && openMenu && (
        <Portal>
          <Fade in={openMenu}>
            <StyledMenu
              onMouseEnter={handleOpenMenu}
              onMouseLeave={handleCloseMenu}
              value={value}
              sx={{
                top: 42,
              }}
            >
              {children.map((list) => (
                <NavSubList
                  key={list.subheader}
                  subheader={list.subheader}
                  items={list.items}
                  isDashboard={list.subheader === "Dashboard"}
                  onClose={handleCloseMenu}
                />
              ))}
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

NavSubList.propTypes = {
  items: PropTypes.array,
  onClose: PropTypes.func,
  isDashboard: PropTypes.bool,
  subheader: PropTypes.string,
};

function NavSubList({ items, isDashboard, subheader, onClose }) {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <Stack
      spacing={2.5}
      gridColumn={isDashboard ? "span 6" : "span 2"}
      alignItems="flex-start"
    >

      {items &&
        items.length > 0 &&
        items.map((item) =>
          isDashboard ? (
            <NavItemDashboard key={item.title} item={item} onClick={onClose} />
          ) : (
            <NavSubItem
              subItem
              key={item.title}
              item={item}
              active={isActive(item.path)}
              onClick={onClose}
            />
          )
        )}
    </Stack>
  );
}
