import React from "react";
import { Box, Button, List, Text } from "@mantine/core";
import { BsCardText, BsCalendar4, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useNavbarItemsStyles } from "../../../hooks/styles/use-navbar-styles";
import { useMediaQuery } from "@mantine/hooks";
import { useModals } from "@mantine/modals";

const MenuItems = [
  {
    icon: <BsCardText />,
    text: "Overview",
    path: "/",
  },
  {
    icon: <BsCalendar4 />,
    text: "Calendar",
    path: "/calendar",
  },
];

const NavbarItems = ({ setOpened }) => {
  const modals = useModals();
  const { classes } = useNavbarItemsStyles();
  const isXsScreen = useMediaQuery("(min-width: 576px)");

  const openAddTaskModal = () =>
    modals.openContextModal("addTaskModal", {
      title: "Create a Task",
      innerProps: {
        task: null,
        isEdit: false,
      },
    });

  return (
    <Box>
      <List
        center
        size={28}
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
          itemIcon: {
            marginRight: "14px",
          },
        }}
      >
        <Button
          onClick={openAddTaskModal}
          radius={15}
          className={classes.button}
          rightIcon={<BsPlus size={isXsScreen ? 35 : 26} />}
          styles={{
            root: {
              paddingRight: isXsScreen ? 0 : 5,
            },
            rightIcon: {
              marginLeft: isXsScreen ? 15 : 5,
            },
          }}
        >
          ADD TASK
        </Button>
        {MenuItems.map((item) => (
          <List.Item
            key={item.text}
            icon={item.icon}
            component={Link}
            to={item.path}
            onClick={() => setOpened(false)}
            className={classes.listItem}
          >
            <Text size="28px">{item.text}</Text>
          </List.Item>
        ))}
      </List>
    </Box>
  );
};

export default NavbarItems;
