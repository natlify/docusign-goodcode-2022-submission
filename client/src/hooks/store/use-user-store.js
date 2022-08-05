/* eslint no-console: 0 */
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import TimeyApiClient from "../../api/timey";

const timeyApi = new TimeyApiClient();

export const useUserStore = () => {
  const [taskState, setTaskState] = useState({});
  const queryClient = useQueryClient();

  const getTasks = async (date) => {
    try {
      const data = await queryClient.fetchQuery(["tasks", date], () =>
        timeyApi.fetchTasks(date),
      );
      return data.tasks;
    } catch (error) {
      showNotification({
        title: "Something went wrong!",
        message: error.message,
        icon: <ImCross />,
        color: "red",
      });
      return [];
    }
  };

  const getLeftoverTasks = async (dueDate) => {
    try {
      const data = await queryClient.fetchQuery(["tasks", "leftovers"], () =>
        timeyApi.fetchLeftoverTasks(dueDate),
      );
      return data.tasks;
    } catch (error) {
      showNotification({
        title: "Something went wrong!",
        message: error.message,
        icon: <ImCross />,
        color: "red",
      });
      return [];
    }
  };

  const { mutateAsync: createTaskAsync, mutate: createTask } = useMutation(
    (task) => timeyApi.postTask(task),
    {
      onSuccess: (_, task) => {
        showNotification({
          title: "Success",
          message: "Task created.",
          icon: <BsCheckLg />,
          color: "teal",
        });
        setTaskState((prevTaskState) => {
          console.log(prevTaskState);
          return {
            prevTaskState,
            dueDate: [prevTaskState[task.dueDate], task],
          };
        });
      },
      onError: (error) => {
        showNotification({
          title: "Something went wrong!",
          message: error.message,
          icon: <ImCross />,
          color: "red",
        });
      },
    },
  );

  const { mutate: changeTask } = useMutation(
    (task) => timeyApi.updateTask(task),
    {
      onSuccess: (_, task) => {
        showNotification({
          title: "Success",
          message: "Task updated.",
          icon: <BsCheckLg />,
          color: "teal",
        });
        setTaskState((prevTaskState) => ({
          prevTaskState,
          dueDate: [prevTaskState[task.dueDate], task],
        }));
      },
      onError: (error) => {
        showNotification({
          title: "Something went wrong!",
          message: error.message,
          icon: <ImCross />,
          color: "red",
        });
      },
    },
  );

  const { mutate: deleteTask } = useMutation(
    (task) => timeyApi.fetchDeleteTask(task),
    {
      onSuccess: (_, task) => {
        showNotification({
          title: "Success",
          message: "Task deleted.",
          icon: <BsCheckLg />,
          color: "teal",
        });
        setTaskState((prevTaskState) => ({
          prevTaskState,
          dueDate: [
            prevTaskState[task.dueDate]?.filter(
              ({ taskId }) => taskId !== task.taskId,
            ),
          ],
        }));
      },
      onError: (error) => {
        showNotification({
          title: "Something went wrong!",
          message: error.message,
          icon: <ImCross />,
          color: "red",
        });
      },
    },
  );

  const { mutate: createLabel } = useMutation(
    (title) => timeyApi.postLabel(title),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("labels");
      },
      onError: (error) => {
        showNotification({
          title: "Something went wrong!",
          message: error.message,
          icon: <ImCross />,
          color: "red",
        });
      },
    },
  );

  return {
    taskState,
    getTasks,
    getLeftoverTasks,
    createTask,
    createTaskAsync,
    changeTask,
    deleteTask,
    createLabel,
  };
};
