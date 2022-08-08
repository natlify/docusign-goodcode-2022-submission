import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from "@mantine/core";
import {
  IconAward,
  IconDiscountCheck,
  IconFlame,
  IconGasStation,
  IconGauge,
  IconLiveView,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.sm,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconGauge },
  { label: "Automatic gearbox", icon: IconManualGearbox },
  { label: "Electric", icon: IconGasStation },
];

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

export default function ImageCard({ data }) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  const { media, verificationStatus, title } = data;

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={media.large} alt="Tesla Model S" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>{title}</Text>
          <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <StatusBadge status={verificationStatus} />
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={"xs"} grow>
          <Button radius="md" variant="outline" color="green">
            Zap Sensitive
          </Button>
          <Button radius="md" variant="gradient" color="green">
            Zap &apos;n Verify
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
