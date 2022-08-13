import {
  Badge,
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { Card, Switch } from "@mantine/core"

import { IconFolder } from "@tabler/icons"
import { PageLayout } from "../layouts/PageLayout"

const Settings = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Settings"}
        pageDesc="A Collection of settings & preferences at both account as well as app level to make a few things easier"
      ></PageLayout>
      <Container mt="-lg" pb={75}>
        <Stack spacing={42}>
          <Stack>
            <Title order={4} size={"xl"}>
              Public Profile
            </Title>
            <Divider my={-5} />
            <Stack spacing={"xs"} mt={"sm"}>
              <Text weight={"bold"} size={"lg"}>
                Full Name
              </Text>
              <Grid grow>
                <Grid.Col span={1}>
                  <TextInput></TextInput>
                  <Text size={"xs"} color="gray">
                    Your name may appear around Zapene wherever you contribute
                    or are mentioned. Helps to identify you easily. You can
                    remove it at any time.{" "}
                  </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Button>Update</Button>
                </Grid.Col>
              </Grid>
            </Stack>
          </Stack>
          <Stack>
            <Title order={4} size={"xl"}>
              Application
            </Title>
            <Divider my={-5} />
            <Stack spacing={"xs"} mt={"sm"}>
              <Group>
                <Text weight={"bold"} size={"lg"}>
                  Media Valet Directory ID
                </Text>
                <Badge color={"pink"} size="xs">
                  Helps in Testing
                </Badge>
              </Group>
              <Grid grow>
                <Grid.Col span={2}>
                  <TextInput icon={<IconFolder size={18} stroke={1.5} />} />
                  <Text size={"xs"} color="gray">
                    Set this value to easily switch between any folders on Media
                    Valet. Easily test multiple scenarios and validate
                    dynamicity
                  </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Button color={"gray"}>Save</Button>
                </Grid.Col>
              </Grid>
            </Stack>
            <SimpleGrid cols={2} my={30}>
              <SwitchesCard
                title={configData.title}
                description={configData.description}
                data={configData.data}
              />
            </SimpleGrid>
            <Group>
              <Text weight={"bold"} size={"lg"}>
                Head of Approvals Email
              </Text>
              <Badge color={"pink"} size="xs">
                Helps in Testing
              </Badge>
            </Group>
            <Text size={"xs"} color="gray">
              If you want to test the final approval and see the status of image
              turn Approved, here you can add an email of your choice. <br />
              PRO TIP: Use a different email than the one you used to login and
              create the portal account
            </Text>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <TextInput label="Approver name" placeholder="Enter name" />
              <TextInput
                label="Approver email"
                placeholder="hello@zapene.app"
                required
              />
            </SimpleGrid>
            <Group>
              {" "}
              <Button>Update Approver</Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </Container>
  )
}
export default Settings

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}))

const configData = {
  title: "Accounts & Set Up",
  description: "Manage Connections to different accounts from here",
  data: [
    {
      title: "Esri. ArcGIS",
      description: "Platform supporting Map functions & Survey123 ",
    },
    {
      title: "DocuSign",
      description: "Authentication via JWT Consent & Grant ",
    },
    {
      title: "MediaValet 2.0",
      description: "Connection via OAuth username-password [DEPREC]",
    },
  ],
}

export function SwitchesCard({ title, description, data }) {
  const { classes } = useStyles()

  const items = data.map((item) => (
    <Group
      position="apart"
      className={classes.item}
      noWrap
      spacing="xl"
      key={item.title}
    >
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch
        onLabel="ON"
        offLabel="OFF"
        checked
        className={classes.switch}
        readOnly
        size="lg"
      />
    </Group>
  ))

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Group>
        <Text size="lg" className={classes.title} weight={500}>
          {title}
        </Text>
        <Badge color={"red"} size="sm">
          Admin only
        </Badge>
      </Group>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        {description}
      </Text>
      {items}
    </Card>
  )
}
