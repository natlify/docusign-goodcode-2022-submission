import { createStyles } from "@mantine/core";

/**
 * Navbar
 */
export const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.lightBg,
  },

  navbarTop: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  navbarItems: {
    width: "100%",
  },

  avatar: {
    margin: "15px auto",
    width: 100,
    height: 100,
    border: `5px solid ${theme.colors.primary[6]}`,
    borderRadius: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.fn.smallerThan("xs")]: {
      width: 80,
      height: 80,
    },
    ".mantine-Avatar-placeholder": {
      backgroundColor: theme.colors.dark[5],
      color: theme.colors.dark[1],
    },
  },

  guestText: {
    padding: "15px 40px 10px",
    maxWidth: "400px",
    textAlign: "center",
    fontSize: "20px",
  },

  anchor: {
    fontSize: "20px",
    color: theme.colors.primary[6],
  },

  userNames: {
    fontSize: 32,
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "center",
    wordSpacing: "100vw",
    [theme.fn.smallerThan("xs")]: {
      fontSize: 26,
    },
  },

  navbarBottom: {
    width: "100%",
    fontSize: 28,
    textDecoration: "none",
    color: theme.colors.navbarText,

    "&:hover": {
      color: theme.colors.lightBg,
      backgroundColor: theme.colors.highlightBg,
    },

    svg: {
      verticalAlign: "middle",
      marginRight: "14px",
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 22,
    },
  },

  logoutWrapper: {
    minHeight: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 300,
  },
}));

/**
 * Navbar Items
 */
export const useNavbarItemsStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.primary[6],
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    fontSize: 26,
    lineHeight: "34px",
    letterSpacing: "0.1em",
    fontWeight: 500,
    width: 260,
    height: 55,
    margin: "30px 0 20px",
    "&:hover": {
      backgroundColor: theme.colors.primary[8],
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 20,
      width: 180,
      height: 45,
    },
  },

  listItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    fontWeight: 300,
    color: theme.colors.navbarText,
    textDecoration: "none",
    height: 60,
    "&:hover": {
      color: theme.colors.lightBg,
      backgroundColor: theme.colors.highlightBg,
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 22,
    },
  },
}));
