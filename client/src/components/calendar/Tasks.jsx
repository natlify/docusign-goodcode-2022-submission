import React, { useContext, useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { Box, Stack, Text } from "@mantine/core";
import { ImCross } from "react-icons/im";

import { useCalendarPageStyles } from "../../hooks/styles/use-calendar-page-styles";
import { UserContext } from "../../UserContext";
import SingleTask from "../SingleTask";
import EmptyTasksTitle from "./EmptyTasksTitle";
import TasksWrapper from "./TasksWrapper";

const Tasks = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const { classes } = useCalendarPageStyles();
  const { store } = useContext(UserContext);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await store.getTasks(selectedDate);
        setTasks(data);
      } catch (error) {
        showNotification({
          title: "Something went wrong!",
          message: "Failed to fetch tasks",
          icon: <ImCross />,
          color: "red",
        });
      }
    };
    getTasks();
  }, [selectedDate, store.taskState]);

  return (
    <Box className={classes.tasks}>
      <Text className={classes.tasksHeader}>Tasks</Text>
      <TasksWrapper isScroll={tasks?.length > 5}>
        <Stack className={classes.tasksContainer}>
          {tasks?.length ? (
            tasks?.map((task) => <SingleTask key={task.taskId} task={task} />)
          ) : (
            <EmptyTasksTitle />
          )}
        </Stack>
      </TasksWrapper>
    </Box>
  );
};

export default Tasks;
