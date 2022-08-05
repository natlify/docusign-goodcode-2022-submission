import { createStyles } from "@mantine/core";

/**
 * Dashboard
 */
export const useDashboardStyles = createStyles((theme) => ({
  dashboardWrapper: {
    display: "flex",
    flexDirection: "column",
    [theme.fn.smallerThan("sm")]: {
      minHeight: "calc(100vh - 80px)",
    },
    [theme.fn.largerThan("sm")]: {
      minHeight: "100vh",
    },
  },
}));

/**
 * Header
 */
export const useDashboardHeaderStyles = createStyles((theme) => ({
  headerWrapper: {
    flex: 1.5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,

    [theme.fn.smallerThan(997)]: {
      minHeight: 150,
      flexDirection: "column",
      justifyContent: "space-evenly",
    },

    h4: {
      textShadow: theme.other.mainShadow,
      whiteSpace: "nowrap",
      color: theme.white,

      [theme.fn.smallerThan("xl")]: {
        fontSize: 32,
      },
    },
  },
}));

/**
 * Collections
 */
export const useCollectionsStyles = createStyles((theme) => ({
  collectionsWrapper: {
    flex: 3.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    [theme.fn.smallerThan(1280)]: {
      margin: "30px 0",
    },
  },

  collectionsTitle: {
    color: theme.colors.primary[6],
    textShadow: theme.other.mainShadow,
    letterSpacing: "0.2em",

    [theme.fn.smallerThan("xl")]: {
      fontSize: 28,
    },

    [theme.fn.smallerThan(997)]: {
      textAlign: "center",
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 24,
    },
  },

  scrollArea: {
    height: 210,
    marginTop: 15,

    [theme.fn.smallerThan("xl")]: {
      height: 180,
    },
  },

  collectionsContent: {
    display: "flex",
    gap: 70,
    width: 0,
    margin: "0 4px",
  },

  collectionCard: {
    minWidth: 305,
    height: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: theme.other.mainShadow,
    backgroundColor: theme.colors.lightBg,
    borderRadius: "15px",

    [theme.fn.smallerThan("xl")]: {
      minWidth: 250,
      height: 150,
    },

    h5: {
      color: theme.white,
      fontWeight: 400,
      lineHeight: "32px",
      fontSize: 28,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",

      [theme.fn.smallerThan("xl")]: {
        fontSize: 24,
      },
    },
  },

  taskNumber: {
    fontSize: 22,

    [theme.fn.smallerThan("xl")]: {
      fontSize: 18,
    },
  },
}));

/**
 * Lists
 */
export const useListsStyles = createStyles((theme) => ({
  listsWrapper: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "130px",
    paddingTop: 15,
    paddingBottom: 40,

    [theme.fn.smallerThan("xl")]: {
      columnGap: "80px",
      rowGap: "20px",
    },

    [theme.fn.smallerThan("sm")]: {
      columnGap: "20px",
    },

    h5: {
      color: theme.colors.primary[6],
      textShadow: theme.other.mainShadow,
      letterSpacing: "0.2em",
      textAlign: "center",
      paddingBottom: 20,
      fontSize: 28,

      [theme.fn.largerThan("xl")]: {
        paddingBottom: 0,
      },

      [theme.fn.smallerThan("xl")]: {
        fontSize: 24,
      },
    },

    ".mantine-Divider-root": {
      position: "absolute",
      right: "32%",
      height: "80%",
      alignSelf: "center",

      [theme.fn.smallerThan(1279)]: {
        display: "none",
      },

      [theme.fn.smallerThan("xl")]: {
        right: "33%",
      },
    },
  },

  listScrollArea: {
    maxHeight: "34vh",

    [theme.fn.largerThan(1279)]: {
      minHeight: "34vh",
    },
  },

  singleListWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  tasksWrapper: {
    width: "97%",
    marginBottom: 5,
  },

  placeholderText: {
    fontSize: 26,
    paddingTop: 15,
    paddingLeft: 12,
  },
}));

/**
 * SearchBar
 */
export const useSearchBarStyles = createStyles((theme) => ({
  searchBarWrapper: {
    color: theme.colors.primary[6],
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    position: "relative",

    svg: {
      [theme.fn.smallerThan("xl")]: {
        height: 34,
        width: 34,
      },

      [theme.fn.smallerThan("xs")]: {
        height: 26,
        width: 26,
      },
    },
  },
  searchList: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: "translateY(60px)",
    background: theme.colors.dark[7],
    zIndex: 999,
    border: `3px solid ${theme.colors.dark[4]}`,
    borderRadius: "10px",

    [theme.fn.smallerThan(500)]: {
      width: "100%",
      transform: "translate(0, 50px)",
    },
  },
  searchListScroll: {
    height: "400px",
  },
  searchListItem: {
    listStyleType: "none",
    padding: "15px",
    borderRadius: "10px",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.colors.dark[3],
      color: theme.colors.primary[2],
    },
  },
  searchListItemContent: {
    width: "100%",
    position: "relative",
    cursor: "pointer",
    padding: "0 20px",

    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    flexWrap: "nowrap",
    gap: "5px",
  },
  searchListItemDash: {
    position: "absolute",
    left: "0",
    top: "50%",
    transform: "rotate(90deg) translate(-50%, 50%)",
  },
  searchIcon: {
    [theme.fn.largerThan(1200)]: {
      minHeight: "34px",
      minWidth: "34px",
    },
  },
}));
