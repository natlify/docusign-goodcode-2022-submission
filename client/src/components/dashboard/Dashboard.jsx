import React from "react";
import { Box } from "@mantine/core";

import { useDashboardStyles } from "../../hooks/styles/use-dashboard-styles";
import Lists from "./lists/Lists";
import Collections from "./Collections";
import Header from "./Header";

const Dashboard = () => {
  const { classes } = useDashboardStyles();

  return (
    <Box className={classes.dashboardWrapper}>
      <Header />
      <Collections />
      <Lists />
    </Box>
  );
};

export default Dashboard;
