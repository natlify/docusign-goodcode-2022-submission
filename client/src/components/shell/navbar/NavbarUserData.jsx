import React from "react";
import { Box, Avatar, Text } from "@mantine/core";
import { useNavbarStyles } from "../../../hooks/styles/use-navbar-styles";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "react-query";
import TimeyApiClient from "../../../api/timey";
import { ImCross } from "react-icons/im";
import { showNotification } from "@mantine/notifications";

const timeyApi = new TimeyApiClient();

const NavbarUserData = () => {
  const { classes } = useNavbarStyles();
  const isXsScreen = useMediaQuery("(max-width: 576px)");

  const { data: user } = useQuery(["userData"], timeyApi.getUser, {
    onError: (error) => {
      showNotification({
        title: "Something went wrong!",
        message: error.message,
        icon: <ImCross />,
        color: "red",
      });
    },
  });

  return (
    <>
      <Box>
        <Avatar
          size="lg"
          width={isXsScreen ? 100 : 130}
          height={isXsScreen ? 100 : 130}
          className={classes.avatar}
          alt="User initials"
        >
          {user?.first_name[0].toUpperCase() +
            user?.second_name[0].toUpperCase()}
        </Avatar>
      </Box>
      <Text className={classes.userNames}>
        {user?.first_name + " " + user?.second_name}
      </Text>
    </>
  );
};

export default NavbarUserData;
