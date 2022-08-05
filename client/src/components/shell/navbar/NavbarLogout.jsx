import React from "react";
import { Box } from "@mantine/core";
import { BsBoxArrowLeft } from "react-icons/bs";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import { useNavbarStyles } from "../../../hooks/styles/use-navbar-styles";
import TimeyApiClient from "../../../api/timey";
import { useNavigate } from "react-router-dom";

const timeyApi = new TimeyApiClient();

const NavbarLogout = () => {
  const { classes } = useNavbarStyles();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation(() => timeyApi.logout(), {
    onSuccess: (data) => {
      showNotification({
        title: "Success",
        message: data.message,
        icon: <BsCheckLg />,
        color: "teal",
      });
      localStorage.removeItem("userType");
      navigate(0);
    },
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
    <Box className={classes.logoutWrapper} onClick={logout}>
      <BsBoxArrowLeft />
      Log out
    </Box>
  );
};

export default NavbarLogout;
