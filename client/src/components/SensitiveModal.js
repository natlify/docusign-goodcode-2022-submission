import {
  Autocomplete,
  Box,
  Button,
  Center,
  Grid,
  Group,
  List,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { DndList } from "../components/SortableArray";
import { useSelector } from "react-redux";
import { useListState } from "@mantine/hooks";
import { getInitials } from "../utils/string";
import { closeAllModals } from "@mantine/modals";

const SensitiveModal = ({ onConfirmHandler }) => {
  const contacts = useSelector((root) => root.contacts.list);
  const autoSuggestList = contacts.map((person) => ({
    value: person.name,
    id: person.email,
  }));

  const [reviewersList, reviewersHandlers] = useListState([]);
  return (
    <Stack spacing={"xl"}>
      <Stack my={"lg"} spacing={"sm"}>
        <Group position="center">
          <Text size={"lg"}>Sensitive Mode</Text>
          <Switch
            label=""
            size="lg"
            onLabel="ON"
            offLabel="OFF"
            checked
            readOnly
          />
        </Group>
        <Center>
          <Text size="sm">
            Use this to secure images containing graphic / sensitive or
            confidential information
          </Text>
        </Center>
      </Stack>
      <Grid gutter={"xl"}>
        <Grid.Col span={5}>
          <Title order={6} mb={5}>
            Select Reviewers
          </Title>
          <Stack spacing={"lg"}>
            <Autocomplete
              // label="Select Reviewers"
              placeholder="Start Selecting"
              data={autoSuggestList}
              onItemSubmit={(item) => {
                const selectedContact = contacts.filter(
                  (person) => person.email === item.id,
                )[0];
                const { name, email } = selectedContact;
                reviewersHandlers.prepend({
                  name,
                  email,
                  initials: getInitials(name),
                });
              }}
              value=""
            />
            <DndList state={reviewersList} handlers={reviewersHandlers} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={7}>
          <Box>
            <Stack spacing={"xs"} justify="flex-end">
              <Title order={6}>What does this mean?</Title>
              <List size={"sm"} spacing={"xs"}>
                <List.Item>Images will be marked as Sensitive</List.Item>
                <List.Item>Handled Separately from regular data</List.Item>
                <List.Item>Privy to eyes of authorised Personnel</List.Item>
                <List.Item>
                  Option to include review from approved individuals
                </List.Item>
                <List.Item>
                  Once Approved, it will be moved to Restricted Access Group
                </List.Item>
              </List>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
      <Group position="right">
        <Button variant="outline" color="dark" onClick={closeAllModals}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            onConfirmHandler({ isSensitive: true, reviewers: reviewersList })
          }
        >
          Confirm
        </Button>
      </Group>
    </Stack>
  );
};
export default SensitiveModal;
