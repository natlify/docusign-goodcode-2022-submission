import React, { useContext, useState } from "react";
import { Button, Group, Switch, Textarea, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import {
  BsCalendarEvent,
  BsChevronDown,
  BsChevronUp,
  BsTrash,
} from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";

import { useAddTaskStyles } from "../../../hooks/styles/use-add-task-styles.js";
import { addTaskSchema } from "../../../utils/addTaskSchema";
import { UserContext } from "../../../UserContext.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import AddTaskCollapse from "./AddTaskCollapse.jsx";

export const AddTaskModal = ({ context, id, innerProps }) => {
  const [collapseOpened, setCollapseOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const { classes: addTaskClasses } = useAddTaskStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { store } = useContext(UserContext);

  const { isEdit, task } = innerProps;

  const form = useForm({
    schema: yupResolver(addTaskSchema),
    initialValues: isEdit
      ? {
          title: task.title,
          description: task.description,
          dueDate: dayjs(task.dueDate).toDate(),
          labels: task.labels,
          status: task.status,
          priority: task.priority,
        }
      : {
          title: "",
          description: "",
          dueDate: new Date(),
          labels: [],
          status: false,
          priority: 2,
        },
  });

  const handleDelete = () => setDeleteOpened(true);
  const closeContextModal = () => context.closeModal(id);
  const handleSubmit = (values) => {
    if (isEdit) {
      store.changeTask({ taskId: task.taskId, ...values });
    } else {
      store.createTask(values);
    }
    closeContextModal();
  };
  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          required
          className={addTaskClasses.label}
          label="TITLE"
          placeholder=""
          {...form.getInputProps("title")}
        />
        <Textarea
          className={addTaskClasses.label}
          label="DESCRIPTION"
          placeholder=""
          required
          minRows={3}
          {...form.getInputProps("description")}
        />
        <Group position="apart" align="end">
          <DatePicker
            className={addTaskClasses.label}
            minDate={new Date()}
            inputFormat="YYYY-MM-DD"
            value={form.values.dueDate}
            onChange={(value) => form.setFieldValue("dueDate", value)}
            icon={<BsCalendarEvent />}
            label="DUE DATE"
            {...form.getInputProps("dueDate")}
            clearable={false}
            required
            dropdownType={isMobile ? "modal" : "popover"}
            styles={{
              input: {
                width: 140,
                fontSize: 16,
              },
            }}
          />
          {isEdit && (
            <Switch
              checked={form.values.status}
              onChange={(event) =>
                form.setFieldValue("status", event.currentTarget.checked)
              }
              size="lg"
              styles={(theme) => ({
                root: {
                  flexDirection: "column-reverse",
                },
                input: {
                  backgroundColor: theme.colors.darkBg,
                  "&:checked": {
                    backgroundColor: theme.colors.primary[6],
                    borderColor: theme.colors.primary[6],
                  },
                },
                label: {
                  color: theme.white,
                },
              })}
              label="TASK STATUS"
            />
          )}
          <Button
            className={addTaskClasses.collapseButton}
            variant="subtle"
            onClick={() => setCollapseOpened(!collapseOpened)}
            rightIcon={collapseOpened ? <BsChevronUp /> : <BsChevronDown />}
          >
            MORE
          </Button>
        </Group>
        <AddTaskCollapse form={form} collapseOpened={collapseOpened} />
        <Group
          position={isEdit ? "apart" : "right"}
          className={addTaskClasses.buttonGroup}
        >
          {isEdit && (
            <Button
              variant="outline"
              color="red"
              rightIcon={<BsTrash size={18} />}
              onClick={handleDelete}
            >
              DELETE
            </Button>
          )}
          <Group>
            <Button
              variant="outline"
              className={addTaskClasses.cancelButton}
              onClick={() => context.closeModal(id)}
            >
              CANCEL
            </Button>
            <Button className={addTaskClasses.submitButton} type="submit">
              SAVE
            </Button>
          </Group>
        </Group>
      </form>
      <ConfirmDeleteModal
        opened={deleteOpened}
        setOpened={setDeleteOpened}
        closeContextModal={closeContextModal}
        task={task}
      />
    </>
  );
};

export default AddTaskModal;
