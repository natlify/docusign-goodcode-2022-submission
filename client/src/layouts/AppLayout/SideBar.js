import { Aside, Container, Footer, MediaQuery, Text } from "@mantine/core";

const SideBar = () => {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Container>
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Text>Application sidebar</Text>
        </Aside>
      </Container>
    </MediaQuery>
  );
};

export default SideBar;
