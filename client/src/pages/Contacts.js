import { Center, Container, Stack } from "@mantine/core";
import { ContactBook } from "../components/ContactBook";
import { PageLayout } from "../layouts/PageLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AddNew } from "../components/AddNewContact";
import { supabase } from "../utils/supabase";
import { contacts } from "../models/contacts";

const Contacts = () => {
  const contactList = useSelector((root) => root.contacts.list);
  const isLoading = useSelector(
    (root) => root.loading.effects.contacts.fetchData,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => await dispatch.contacts.fetchData();
    loadData();
  }, []);

  const addNewEntry = async (person) => {
    dispatch.contacts.addToList(person);
    await supabase.from("contacts").insert([person]);
  };
  return (
    <Container>
      <PageLayout
        pageTitle={"Contacts"}
        pageDesc="View &amp; Manage list of external contacts. Portal users will be given an option to choose external reviewers from the following list while requesting for approvals"
      >
        <Stack my={20}>
          <AddNew onSubmitHandler={addNewEntry} />
          {<ContactBook data={contactList} />}
        </Stack>
      </PageLayout>
    </Container>
  );
};
export default Contacts;
