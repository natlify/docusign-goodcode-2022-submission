import { createStyles } from "@mantine/core";

/**
 * Header
 */
export const useHeaderStyles = createStyles((theme) => ({
  header: {
    [theme.fn.smallerThan("sm")]: {
      height: 80,
    },

    [theme.fn.largerThan("sm")]: {
      height: 0,
      display: "none",
    },
  },

  headerItemsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  iconWrapper: {
    color: theme.colors.primary[6],
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 44,
    marginRight: 25,
    cursor: "pointer",
  },
}));
