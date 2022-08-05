import { createStyles } from "@mantine/core";

export const useCalendarPageStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    padding: "0 1rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "40px",
    maxWidth: "1200px",
    [theme.fn.largerThan(769)]: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "100px auto",
      gap: "100px",
    },
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: theme.colors.primary[6],
    marginTop: "20px",
    [theme.fn.smallerThan(1200)]: {
      textAlign: "center",
    },
  },
  content: {
    width: "100%",
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    gap: 70,
    [theme.fn.smallerThan(1200)]: {
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "50px",
    },
  },
  tasks: {
    width: "100%",
    maxWidth: "450px",
  },
  tasksHeader: {
    fontSize: 36,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: theme.colors.primary[6],
    textAlign: "center",
  },
  tasksScrollArea: {
    height: 450,
  },
  tasksContainer: {
    gap: 20,
    width: "100%",
  },
}));
