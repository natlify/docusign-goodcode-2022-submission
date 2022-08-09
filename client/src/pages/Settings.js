import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import { PageLayout } from "../layouts/PageLayout";
const Settings = () => {
  const { dispatch, store } = useStore();
  const count = useSelector((root) => root.count);
  const loading = useSelector((root) => root.loading.models.count);
  return (
    <Container>
      <PageLayout
        pageTitle={"Settings & Preferences"}
        pageDesc="Cillum velit pariatur sint elit laboris. Officia consectetur non i quis proident nisi do sit. Sunt dolor aute velit aute."
      >
        <Stack my={20} justify={"center"} spacing="xl" align={"center"}>
          <Container>{loading && <Loader variant="bars" />}</Container>
          <Group align={"center"} position="center">
            <Text>{count}</Text>
            <Button onClick={async () => await dispatch.count.increment(1)}>
              Click Me
            </Button>
          </Group>
          <Group align={"center"} position="center">
            <Text>{count}</Text>
            <Button
              onClick={async () => await dispatch.count.incrementAsync(1)}
            >
              Click Me
            </Button>
          </Group>
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Settings;
