import { Button, Center, Container, Loader, Stack } from "@mantine/core";
import { PageLayout } from "../layouts/PageLayout";

const Loading = () => {
  return (
    <Center m={0} p={0} style={{ height: 500 }}>
      <Loader variant="bars" size={64} />
    </Center>
  );
};

export default Loading;
