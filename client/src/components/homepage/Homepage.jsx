import React, { useState } from "react";
import { Anchor, Box, Text } from "@mantine/core";

import { useHomepageStyles } from "../../hooks/styles/use-homepage-styles";
import Logo from "../Logo.jsx";
import Footer from "./Footer";
import HomeHero from "./HomeHero";
import SignInModal from "../modals/SignInModal";

const Homepage = () => {
  const { classes } = useHomepageStyles();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <SignInModal opened={opened} setOpened={() => setOpened(false)} />
      <Box className={classes.navbarContainer}>
        <Logo />
        <Box className={classes.singInContainer}>
          <Text size="xl" align={"right"} className={classes.text}>
            Already have an account?
          </Text>
          <Anchor
            size="xl"
            className={classes.anchor}
            onClick={() => setOpened(true)}
          >
            Sign in
          </Anchor>
        </Box>
      </Box>
      <HomeHero />
      <Footer />
    </>
  );
};

export default Homepage;
