import { Container, Stack } from "@mantine/core";
import { PageLayout } from "../layouts/PageLayout";

const Schedule = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Scheduler Page"}
        pageDesc="Cillum velit pariatur sint elit laboris. Officia consectetur non i quis proident nisi do sit. Sunt dolor aute velit aute."
      >
        <Stack my={20}>My custom Content</Stack>
      </PageLayout>
    </Container>
  );
};
export default Schedule;
