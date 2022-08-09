import { Center, Container, Stack } from "@mantine/core";
import { ContactBook } from "../components/ContactBook";
import { PageLayout } from "../layouts/PageLayout";
import mockContacts from "../data/contacts.json";

const Contacts = () => {
  return (
    <Container>
      <PageLayout
        pageTitle={"Contacts"}
        pageDesc="View &amp; Manage list of external contacts. Portal users will be given an option to choose external reviewers from the following list while requesting for approvals"
      >
        <Stack my={20}>
          <ContactBook data={mockContacts} />
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Contacts;
