import { Container, Paper, Title } from "@mantine/core";
import { Auth } from "@supabase/ui";
import { PageLayout } from "../layouts/PageLayout";
import { supabase } from "../utils/supabase";

const AppAuth = () => {
return (
  <Container>
    <PageLayout>
      <Container size={620} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Auth supabaseClient={supabase} redirectTo="/app" />
        </Paper>
      </Container>
    </PageLayout>
  </Container>
)
};
export default AppAuth;
