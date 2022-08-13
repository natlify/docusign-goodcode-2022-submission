import { Container, Stack } from "@mantine/core";
import SensitiveModal from "../components/SensitiveModal";
import { PageLayout } from "../layouts/PageLayout";

const Analytics = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Analytics Hub"}
        pageDesc="ArcGIS StoryMaps combined with the MediaValet Images [geotagged] can be used to understand the progression of animals over time in a given area. Scroll down to see in action"
      >
        <Stack
          my={20}
          style={{
            width: 800,
          }}
        >
          <p>[WIP : Not added in final submission due to lack of time] </p>
          <p>[This Page is not for evaluation]</p>
        </Stack>
      </PageLayout>
    </Container>
  )
};
export default Analytics;
