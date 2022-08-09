import { useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Text,
  Button,
  Indicator,
  HoverCard,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconExternalLink,
  IconUserCircle,
  IconBell,
} from "@tabler/icons";
import Logo from "../../components/icons/Logo";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const externalLinks = [
  {
    link: "/about",
    label: "DocuSign Dev",
  },
  {
    link: "/learn",
    label: "Survey123",
  },
];

export default function HeaderMiddle() {
  const links = externalLinks;
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      <Group spacing={5}>
        <Text>{link.label}</Text>
        <IconExternalLink size={16} stroke={1.5} />
      </Group>
    </a>
  ));

  return (
    <Header height={64} mb={120}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Container mt={10}>
          <Logo height={56} />
        </Container>

        <Group
          spacing={"sm"}
          className={classes.social}
          position="right"
          noWrap
        >
          <ActionIcon size="xl">
            <IconBrandTwitter size={22} stroke={1.5} />
          </ActionIcon>
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon size="xl">
                <Indicator size={8} color="red">
                  <IconBell size={22} stroke={1.5} />
                </Indicator>
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">Everything Caught up. No New Notifications.</Text>
            </Popover.Dropdown>
          </Popover>
          <HoverCard width={180} shadow="md" closeDelay={500}>
            <HoverCard.Target>
              <ActionIcon size="xl">
                <IconUserCircle size={22} stroke={1.5} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">Account Details Shown here</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Container>
    </Header>
  );
}