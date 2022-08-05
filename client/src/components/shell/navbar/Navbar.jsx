import React from "react";
import { Navbar } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import { useNavbarStyles } from "../../../hooks/styles/use-navbar-styles";
import Logo from "../../Logo";
import NavbarItems from "./NavbarItems";
import NavbarUser from "./NavbarUser";
import NavbarLogout from "./NavbarLogout";

const AppNavbar = ({ opened, setOpened }) => {
  const { classes } = useNavbarStyles();
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const isUser = localStorage.getItem("userType") === "user";

  return (
    <Navbar
      py="md"
      mt={smallScreen && 80}
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 320 }}
      styles={{
        root: {
          "@media (max-width: 768px)": {
            minHeight: "calc(100vh - 80px)",
          },
          "@media (min-width: 768px)": {
            minHeight: "100vh",
          },
        },
      }}
      className={classes.navbar}
    >
      <Navbar.Section className={classes.navbarTop}>
        <Logo />
        <NavbarUser />
      </Navbar.Section>
      <Navbar.Section grow className={classes.navbarItems}>
        <NavbarItems setOpened={setOpened} />
      </Navbar.Section>
      {isUser ? (
        <Navbar.Section
          className={classes.navbarBottom}
          component={Link}
          to="/"
        >
          <NavbarLogout />
        </Navbar.Section>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default AppNavbar;
