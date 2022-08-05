import React from "react";
import { createStyles, Title } from "@mantine/core";

const useLogoStyles = createStyles((theme) => ({
  h1: {
    color: theme.colors.primary[6],
    letterSpacing: "0.2em",
    textShadow: theme.other.mainShadow,
    marginRight: "-0.2em",

    [theme.fn.smallerThan("xs")]: {
      fontSize: 36,
    },
  },
}));

const Logo = () => {
  const { classes } = useLogoStyles();

  return (
    <Title className={classes.h1} order={1}>
      TIMEY
    </Title>
  );
};

export default Logo;
