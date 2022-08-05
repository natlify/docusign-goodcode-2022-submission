import { TextInput } from "@mantine/core";
import React from "react";
import { useModalStyles } from "../../hooks/styles/use-modals-styles";

const Input = ({ label, placeholder, formProps }) => {
  const { classes } = useModalStyles();

  return (
    <TextInput
      required
      label={label}
      placeholder={placeholder}
      className={classes.inputField}
      {...formProps}
    />
  );
};

export default Input;
