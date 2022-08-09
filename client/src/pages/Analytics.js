import { Center, Container, Stack, Text } from "@mantine/core";
import { AddNew, CompanyPicker } from "../components/AddNewContact";
import { PageLayout } from "../layouts/PageLayout";

const Analytics = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Analytics Hub"}
        pageDesc="Cillum velit pariatur sint elit laboris. Officia consectetur non i quis proident nisi do sit. Sunt dolor aute velit aute."
      >
        <Stack my={20}>
          <Center style={{ height: 500 }}>{/* <AddNew /> */}</Center>
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Analytics;
