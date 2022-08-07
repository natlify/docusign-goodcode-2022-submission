import React, { useState } from "react";
import { AppShell, Box, useMantineTheme } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { useShellStyles } from "../../hooks/styles/use-shell-styles";
import Dashboard from "../dashboard/Dashboard";
import CalendarPage from "../calendar/CalendarPage";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar.jsx";

const Shell = () => {
  const [opened, setOpened] = useState(false);
  const { classes } = useShellStyles();
  const theme = useMantineTheme();

  return (
    <AppShell
      fixed
      className={opened ? classes.smallShell : classes.shell}
      styles={{
        main: {
          paddingLeft: 390,
          paddingRight: 70,
          paddingBottom: 0,

          [theme.fn.smallerThan("lg")]: {
            paddingLeft: 370,
            paddingRight: 50,
          },

          [theme.fn.smallerThan("sm")]: {
            padding: "80px 40px 0",
          },
        },
      }}
      navbar={<Navbar opened={opened} setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Box>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Box>
    </AppShell>
  );
};

export default Shell;
