import { createStyles, Title, Text, Button, Container, Group, Image, Center } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 50,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));
const GuestOrApiErrorPage = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Center><Image src='https://i.pinimg.com/originals/22/c0/01/22c0015bef4e1edb6103212d363e9b09.png' height={"20vh"} width={"auto"}/></Center>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}

export default GuestOrApiErrorPage