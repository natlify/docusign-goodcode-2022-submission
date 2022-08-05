import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, PasswordInput, Group, SimpleGrid } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";

import { useModalStyles } from "../../hooks/styles/use-modals-styles";
import { registrationSchema } from "../../utils/registrationSchema";
import TimeyApiClient from "../../api/timey";
import { UserContext } from "../../UserContext";
import Input from "./Input";

const timeyApi = new TimeyApiClient();

const forms = [
  {
    label: "First Name",
    placeholder: "",
    propsName: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "",
    propsName: "lastName",
  },
  {
    label: "Username",
    placeholder: "",
    propsName: "username",
  },
  {
    label: "Email",
    placeholder: "example@mail.com",
    propsName: "email",
  },
];

const SignUpModal = ({ opened, setOpened, openImport }) => {
  const { classes } = useModalStyles();
  const { store, userType, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm({
    schema: yupResolver(registrationSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register } = useMutation(
    (values) => timeyApi.register(values),
    {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Account created.",
          icon: <BsCheckLg />,
          color: "teal",
        });
        if (userType !== "user" && store.getTasks().length > 0) {
          setOpened(false);
          openImport();
        } else {
          setUser();
          navigate(0);
        }
      },
      onError: (error) => {
        showNotification({
          title: "Something went wrong!",
          message: error.message,
          icon: <ImCross />,
          color: "red",
        });
      },
    },
  );

  const handleSubmit = (values) => {
    register(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      size="xl"
      title="Sign up"
      className={classes.modal}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 650, cols: 1, spacing: "sm" }]}
        >
          {forms.map((item) => (
            <Input
              label={item.label}
              key={item.label}
              placeholder={item.placeholder}
              formProps={form.getInputProps(item.propsName)}
            />
          ))}
          <PasswordInput
            className={classes.inputField}
            required
            label="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            className={classes.inputField}
            required
            label="Confirm Password"
            {...form.getInputProps("confirmPassword")}
          />
        </SimpleGrid>
        <Group position="right" mt="xl">
          <Button type="submit" className={classes.button}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignUpModal;
