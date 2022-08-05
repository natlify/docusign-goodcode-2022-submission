import { createStyles } from "@mantine/core";

export const useModalStyles = createStyles((theme) => ({
  inputField: {
    label: {
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: "16px",
      paddingTop: "4px",
    },
  },

  modal: {
    ".mantine-Modal-modal": {
      backgroundColor: theme.colors.dark[4],
    },
    ".mantine-Modal-title": {
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: "20px",
      letterSpacing: "2px",
    },
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.primary[8],
    },
    backgroundColor: theme.colors.primary[6],
  },
}));
