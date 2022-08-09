import { Card, Center, Container, Stack } from "@mantine/core";
import { UsersRolesTable } from "../components/RoleManager";
import { PageLayout } from "../layouts/PageLayout";

const Identity = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Identity Access Admin"}
        pageDesc="Manage users who have access to the Portal. Use the section to control &amp; manage access levels once the user signs up"
      >
        <Stack my={20}>
          <Card>
            <UsersRolesTable />
          </Card>
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Identity;
