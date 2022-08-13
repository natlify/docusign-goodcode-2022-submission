import { Center, Container, Stack } from "@mantine/core";
import { PageLayout } from "../layouts/PageLayout";

const Dashboard = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Monitor Dashboard"}
        pageDesc="This page was used to explore the usage of Monitor API during development. Later we decided time wasn't there and discontinued. All Code were removed"
      >
        <Stack my={20}>
          <p>[WIP]</p>
          <p>[This Page is not for evaluation]</p>
        </Stack>
      </PageLayout>
    </Container>
  )
};
export default Dashboard;
