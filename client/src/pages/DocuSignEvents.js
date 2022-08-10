import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import CuteChimp from "../assets/images/cute-chimp.png";
const useStyles = createStyles((theme) => ({
  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xs * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm * 1.5,
  },
}));
const DocuSignEvents = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Center>
        <Image src={CuteChimp} height={"30vh"} width={"auto"} />
      </Center>
      <div className={classes.label}>DONE</div>
      <Title className={classes.title}>You Saved 12 mins of Manual work!</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        The MetaData Verification has been submitted for review/approval,
        succesfully! Please await further updates from the portal
      </Text>
      <Group position="center">
        <Link to="/app">
          <Button variant="subtle" size="md">
            Take me back to main page
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default DocuSignEvents;
