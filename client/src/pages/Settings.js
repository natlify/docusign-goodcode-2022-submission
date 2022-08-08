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
const Settings = () => {
  const { dispatch, store } = useStore();
  const count = useSelector((root) => root.count);
  const loading = useSelector((root) => root.loading.models.count);
  return (
    <Container>
      <Center>Settings</Center>
      <Stack justify={"center"} spacing="xl" align={"center"}>
        <Container>{loading && <Loader variant="bars" />}</Container>
        <Group align={"center"} position="center">
          <Text>{count}</Text>
          <Button onClick={async () => await dispatch.count.increment(1)}>
            Click Me
          </Button>
        </Group>
        <Group align={"center"} position="center">
          <Text>{count}</Text>
          <Button onClick={async () => await dispatch.count.incrementAsync(1)}>
            Click Me
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};
export default Settings;
