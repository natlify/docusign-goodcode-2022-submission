import React from "react";
import { Box, Title } from "@mantine/core";

import { useDashboardHeaderStyles } from "../../hooks/styles/use-dashboard-styles";
import SearchBar from "./SearchBar";

const Header = ({ firstName = "User" }) => {
  const { classes } = useDashboardHeaderStyles();

  return (
    <Box className={classes.headerWrapper}>
      <Title order={4}>What&apos;s up, {firstName}!</Title>
      <SearchBar />
    </Box>
  );
};

export default Header;
