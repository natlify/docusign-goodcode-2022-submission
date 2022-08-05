import React from "react";
import { Box, ScrollArea } from "@mantine/core";
import { useCalendarPageStyles } from "../../hooks/styles/use-calendar-page-styles";

const TasksWrapper = ({ children, isScroll }) => {
  const { classes } = useCalendarPageStyles();

  return isScroll ? (
    <ScrollArea offsetScrollbars className={classes.tasksScrollArea}>
      {children}
    </ScrollArea>
  ) : (
    <Box>{children}</Box>
  );
};

export default TasksWrapper;
