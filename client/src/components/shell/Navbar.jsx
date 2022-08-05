import React from "react";
import { Box, createStyles, Image, Navbar, Text, Title } from "@mantine/core";
import { AddTask } from "../addTask/AddTask"


import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.lightBg,
  },
  navbarTop: {
    minHeight: 410,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    h1: {
      color: theme.colors.main,
      letterSpacing: "0.2em",
      textShadow: theme.other.mainShadow,
    },
  },
  userImage: {
    margin: "0 auto",
    width: 160,
    height: 160,
    border: `5px solid ${theme.colors.main}`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userNames: {
    fontSize: 36,
    color: "#FFFFFF",
    textAlign: "center",
    display: "table-caption",
  },
}));

const AppNavbar = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ base: 320 }}
      className={classes.navbar}
    >
      <Navbar.Section className={classes.navbarTop}>
        <Title order={1}>TIMEY</Title>
        <Box className={classes.imageWrapper}>
          <Image
            width={130}
            height={130}
            radius="50%"
            className={classes.userImage}
            src="https://img.a.transfermarkt.technology/portrait/header/143282-1608735446.jpg?lm=1"
            alt="User Photo"
          />
        </Box>
        <Text weight="bold" className={classes.userNames}>
          Jakub Czerwiński{" "}
        </Text>
      </Navbar.Section>
      <Navbar.Section grow>Navbar</Navbar.Section>
     <AddTask>
     </AddTask>
      <Navbar.Section>Log out</Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;
