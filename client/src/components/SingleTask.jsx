import { Group, Text, useMantineTheme } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { BsCheckCircleFill, BsCircle, BsDashLg } from "react-icons/bs";

const SingleTask = ({ task, isLeftover }) => {
  const theme = useMantineTheme();
  const modals = useModals();
  const { title, priority, status } = task;

  const openAddTaskModal = () =>
    modals.openContextModal("addTaskModal", {
      title: "Edit Task",
      innerProps: {
        task: task,
        isEdit: true,
      },
    });

  const icon = status ? (
    <BsCheckCircleFill size="24px" />
  ) : (
    <BsCircle size="24px" />
  );

  return (
    <Group
      onClick={openAddTaskModal}
      style={{
        alignItems: "center",
        padding: 20,
        width: "100%",
        backgroundColor: isLeftover
          ? theme.colors.leftoverBg
          : theme.colors.lightBg,
        borderRadius: 15,
        position: "relative",
        cursor: "pointer",

        display: "flex",
        flexWrap: "nowrap",
        gap: "20px",
        boxShadow: theme.other.mainShadow,
      }}
    >
      <BsDashLg
        color={theme.other.taskPriorities[priority]}
        size="2.5rem"
        style={{
          transform: "rotate(90deg) translateY(50%)",
          position: "absolute",
          left: "0",
        }}
      />
      {icon}
      <Text
        lineClamp={1}
        style={{
          fontSize: 18,
          color: "#eeeeee",
          textDecorationLine: status ? "line-through" : "",
          maxWidth: "90%",
        }}
      >
        {title}
      </Text>
    </Group>
  );
};

export default SingleTask;
