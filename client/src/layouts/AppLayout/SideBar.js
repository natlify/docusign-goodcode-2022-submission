import { Aside, Container, Footer, MediaQuery, Text } from "@mantine/core";
import { SearchBar } from "../../components/SearchBar";

const SideBar = () => {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Container>
        <Aside
          p="md"
          hiddenBreakpoint="sm"
          width={{ sm: 200, lg: 300 }}
          style={{ zIndex: 0 }}
        >
          <SearchBar />
        </Aside>
      </Container>
    </MediaQuery>
  );
};

export default SideBar;
