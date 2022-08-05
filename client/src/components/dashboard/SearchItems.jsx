import { List } from "@mantine/core";
import React from "react";
import { useSearchBarStyles } from "../../hooks/styles/use-dashboard-styles";
import TasksWrapper from "../calendar/TasksWrapper";
import SearchItem from "./SearchItem";

const SearchItems = ({ tasks, isOpen }) => {
  const { classes } = useSearchBarStyles();

  return (
    <List
      className={classes.searchList}
      sx={{ display: isOpen && tasks.length ? "block" : "none" }}
    >
      <TasksWrapper isScroll={tasks.length > 2}>
        {tasks.map((task) => (
          <SearchItem key={task.task_id} task={task} />
        ))}
      </TasksWrapper>
    </List>
  );
};

export default SearchItems;
