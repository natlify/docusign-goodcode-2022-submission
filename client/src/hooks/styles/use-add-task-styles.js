import { createStyles } from "@mantine/core";

export const useAddTaskStyles = createStyles((theme) => ({
  label: {
    label: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: "0.1em",
      color: theme.white,
      marginTop: 16,
      marginBottom: 0,
    },
  },

  textLabel: {
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: "0.1em",
    color: theme.white,
    marginTop: 16,
    marginBottom: 0,
  },

  collapseButton: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#30505266",
    },
  },

  buttonGroup: {
    paddingTop: 20,
  },

  cancelButton: {
    color: theme.colors.primary[7],
    borderColor: theme.colors.primary[7],
    "&:hover": {
      backgroundColor: "#30505266",
    },
  },

  submitButton: {
    backgroundColor: theme.colors.primary[6],
    "&:hover": {
      backgroundColor: theme.colors.primary[8],
    },
  },
}));
