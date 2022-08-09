import { useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
  Box,
  TextInput,
  Checkbox,
  Button,
  Text,
  Stack,
  Select,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { useForm } from "@mantine/form";

const data = [
  { label: "Jane Goodall", value: "Jane Goodall" },
  { label: "DocuSign", value: "DocuSign" },
  { label: "Esri", value: "Esri" },
  { label: "Zapene", value: "Zapene" },
];

export function AddNew({ onSubmitHandler }) {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      company: "Jane Goodall",
      title: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
      <Box>
        <Stack>
          <Group spacing={"xs"} position="apart" grow>
            <TextInput
              required
              label="Name"
              placeholder="Person's Name"
              {...form.getInputProps("name")}
            />

            <TextInput
              required
              label="Email"
              placeholder="Enter their email"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Role"
              placeholder="Role Name"
              {...form.getInputProps("title")}
            />

            <Select
              label="Company"
              placeholder="Pick one"
              data={data}
              {...form.getInputProps("company")}
            />
          </Group>
          <Group position="right">
            <Button type="submit">Add New</Button>
          </Group>
        </Stack>
      </Box>
    </form>
  );
}
