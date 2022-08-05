import React from "react";
import { MediaQuery, Header } from "@mantine/core";

import { useHeaderStyles } from "../../../hooks/styles/use-header-styles";
import HeaderItems from "./HeaderItems";

const AppHeader = ({ opened, setOpened }) => {
  const { classes } = useHeaderStyles();

  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "block" }}>
        <Header className={classes.header} hp="md">
          <HeaderItems opened={opened} setOpened={setOpened} />
        </Header>
      </MediaQuery>
    </>
  );
};

export default AppHeader;
