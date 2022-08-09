import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
  Progress,
} from "@mantine/core";
import { Avatar } from "@mantine/core";
import { IconBolt } from "@tabler/icons";

import { IconDiscountCheck, IconFlame, IconLiveView } from "@tabler/icons";
import { convertDateToRelativeString, fromSnaketoTitle } from "../utils/string";

const StatusBadge = ({ status }) => {
  switch (status) {
    case "NONE":
      return (
        <Badge color="pink" variant="light">
          <Group position="center" spacing={"xs"}>
            <IconFlame size={12} stroke={3} />
            <Text ml={-5}>New</Text>
          </Group>
        </Badge>
      );

    case "IN_REVIEW":
      return (
        <Badge color="yellow" variant="light">
          <Group position="center" spacing={"xs"}>
            <IconLiveView size={12} stroke={3} />
            <Text ml={-5}>In Progress</Text>
          </Group>
        </Badge>
      );

    case "VERIFIED":
      return (
        <Badge color="green" variant="light">
          <Group position="center" spacing={"xs"}>
            <IconDiscountCheck size={12} stroke={3} />
            <Text ml={-5}>Approved</Text>
          </Group>
        </Badge>
      );
    default:
      break;
  }
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 1,
    pointerEvents: "none",
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const mockData = {
  reviewStatuses: [
    "Sent for L1 Review",
    "2 People Reviewed",
    "Approval Awaited",
  ],
  authors: [
    {
      name: "Ferran Sulaiman",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Christine Carrillo",
      image:
        "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Natasha Kumari",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
  ],
};

export default function ImageCard({
  data,
  index,
  onTriggerClick,
  onSensitiveClick,
}) {
  const { classes, theme } = useStyles();
  const {
    media,
    verificationStatus: category,
    title,
    footer = "2 people reviewed",
    isSensitive,
    record,
  } = data;

  const author = mockData.authors[Math.floor(index % mockData.authors.length)];
  return (
    <Card withBorder p="lg" radius="md" className={classes.card} shadow={"lg"}>
      <Card.Section mb="sm">
        <Image src={media.large} alt={title} height={180} />
      </Card.Section>

      {isSensitive && (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "green", to: "blue" }}
          radius={0}
        >
          Sensitive
        </Badge>
      )}

      <StatusBadge status={category} />

      <Text weight={700} className={classes.title} mt="xs">
        {fromSnaketoTitle(title)}
      </Text>

      <Group mt="lg">
        <Avatar src={author.image} radius="sm" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {author.name}
          </Text>
          {category === "IN_REVIEW" ? (
            <Progress
              sections={[
                { value: 30, color: "yellow" },
                { value: 30, color: "orange" },
              ]}
              mt="md"
              size="xs"
              radius="sm"
            />
          ) : (
            <Text size="xs" color="dimmed">
              Uploaded {convertDateToRelativeString(record.createdAt)}
            </Text>
          )}
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="right">
          {/* <Text size="xs" color="dimmed">
            {footer}
          </Text> */}
          <Group spacing={"md"}>
            <Button
              disabled={category !== "NONE"}
              size="xs"
              variant="light"
              color="indigo"
              onClick={onSensitiveClick}
            >
              <IconBolt size={18} color={theme.colors.orange[7]} stroke={1.5} />
              Secure
            </Button>
            {category !== "NONE" ? (
              <Button
                size="xs"
                variant={"gradient"}
                gradient={{ from: "#51cf66", to: "#2b8a3e", deg: 160 }}
              >
                &nbsp; View &nbsp;
              </Button>
            ) : (
              <Button
                size="xs"
                variant={"gradient"}
                gradient={{ from: "#51cf66", to: "#2b8a3e", deg: 160 }}
                onClick={() => onTriggerClick(data)}
              >
                Verify
              </Button>
            )}
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
