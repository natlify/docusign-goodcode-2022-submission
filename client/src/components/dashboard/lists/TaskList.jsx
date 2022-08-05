import React from "react";
import { Stack, Text } from "@mantine/core";

import { useListsStyles } from "../../../hooks/styles/use-dashboard-styles";
import SingleTask from "../../SingleTask";

const TaskList = ({ tasks, leftovers }) => {
  const { classes } = useListsStyles();

  return (
    <Stack className={classes.tasksWrapper}>
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <SingleTask key={task.taskId} task={task} isLeftover={leftovers} />
        ))
      ) : (
        <Text className={classes.placeholderText} align="center">
          No tasks found.
        </Text>
      )}
    </Stack>
  );
};

export default TaskList;
