import { Text } from "@mantine/core";
import React from "react";
import { useFooterStyles } from "../../hooks/styles/use-homepage-styles";

const Footer = () => {
  const { classes } = useFooterStyles();

  return (
    <footer className={classes.footer}>
      <Text sx={{ fontSize: "16px" }}>@CodersCamp2021-team-lp-project-5</Text>
    </footer>
  );
};

export default Footer;
