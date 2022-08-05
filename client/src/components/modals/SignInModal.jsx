import React, { useContext } from "react";
import { Modal, Button, Group, PasswordInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import { useModalStyles } from "../../hooks/styles/use-modals-styles";
import { loginSchema } from "../../utils/loginSchema";
import TimeyApiClient from "../../api/timey";
import { UserContext } from "../../UserContext";
import Input from "./Input";

const timeyApi = new TimeyApiClient();

const SignInModal = ({ opened, setOpened }) => {
  const { classes } = useModalStyles();
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();

  const form = useForm({
    schema: yupResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useMutation((values) => timeyApi.login(values), {
    onSuccess: (data) => {
      showNotification({
        title: "Success",
        message: data.message,
        icon: <BsCheckLg />,
        color: "teal",
      });
      setUser();
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

  const handleSubmit = (values) => {
    login(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Sign in"
      className={classes.modal}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Input
          required
          label="Email"
          placeholder="example@mail.com"
          formProps={form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          className={classes.inputField}
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="xl">
          <Button type="submit" className={classes.button}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignInModal;
