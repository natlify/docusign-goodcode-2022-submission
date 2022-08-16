import {
  Center,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineTheme,
} from "@mantine/core"
import { PageLayout } from "../layouts/PageLayout"

const PRIMARY_COL_HEIGHT = 300
const Dashboard = () => {
  const theme = useMantineTheme()
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2
  return (
    <Container>
      <PageLayout
        pageTitle={"Monitor Dashboard"}
        pageDesc="This page was used to explore the usage of Monitor API during development. Later we decided time wasn't there and discontinued. All Code were removed"
      ></PageLayout>
      <Container>
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          <Grid gutter="md">
            <Grid.Col>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
        <Group spacing={"xl"} mt={10}>
          <p>[WIP]</p>
          <p>[This Page is not for evaluation]</p>
        </Group>
      </Container>
    </Container>
  )
}
export default Dashboard
