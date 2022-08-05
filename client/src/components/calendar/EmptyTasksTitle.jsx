import { Text } from "@mantine/core";
import React from "react";

const EmptyTasksTitle = () => {
  return (
    <Text
      style={{
        marginTop: "30px",
        textAlign: "center",
        fontSize: 18,
        color: "#eeeeee",
      }}
    >
      There are no tasks to display for selected day
    </Text>
  );
};

export default EmptyTasksTitle;
