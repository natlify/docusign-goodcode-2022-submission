import { Container, Stack } from "@mantine/core";
import SensitiveModal from "../components/SensitiveModal";
import { PageLayout } from "../layouts/PageLayout";

const Analytics = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Analytics Hub"}
        pageDesc="Cillum velit pariatur sint elit laboris. Officia consectetur non i quis proident nisi do sit. Sunt dolor aute velit aute."
      >
        <Stack
          my={20}
          style={{
            width: 800,
          }}
        >
          <SensitiveModal />
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Analytics;
