import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const TASKS = "tasks";
const LABELS = "labels";

export const useGuestStore = () => {
  const [taskState, setTaskState] = useState({});
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(TASKS)) || [],
  );

  const getTasks = (date) => {
    if (date && tasks.length > 0) {
      return (
        JSON.parse(localStorage.getItem(TASKS))
          ?.filter((task) =>
            dayjs(new Date(task.dueDate)).isSame(dayjs(date), "day"),
          )
          .sort((a, b) => b.priority - a.priority) || []
      );
    }

    return JSON.parse(localStorage.getItem(TASKS)) || [];
  };

  const getLeftoverTasks = () =>
    JSON.parse(localStorage.getItem(TASKS))
      ?.filter(
        (task) =>
          task.status === false &&
          dayjs(new Date(task.dueDate)).isBefore(dayjs(), "day"),
      )
      .sort((a, b) => b.priority - a.priority) || [];

  const createTask = (newTask) => {
    const newId = uuidv4();
    const tasksInStore = tasks || [];
    const createdTask = { ...newTask, taskId: newId };
    const updatedTasks = [...tasksInStore, createdTask];

    setTasks(updatedTasks);
    localStorage.setItem(TASKS, JSON.stringify(updatedTasks));

    showNotification({
      title: "Success",
      message: "Task created.",
      icon: <BsCheckLg />,
      color: "teal",
    });
    setTaskState((prevTaskState) => ({
      prevTaskState,
      dueDate: [prevTaskState[createdTask.dueDate], createdTask],
    }));
    return { message: "Task created" };
  };

  const changeTask = (task) => {
    const { taskId, title, description, priority, status, dueDate, labels } =
      task;
    const tasksInStore = tasks || [];
    const taskToChange = tasksInStore.find((task) => task.taskId === taskId);

    if (!taskToChange) {
      showNotification({
        title: "Something went wrong!",
        message: "Could not find the task.",
        icon: <ImCross />,
        color: "red",
      });
    }

    const updatedTask = {
      ...taskToChange,
      priority: priority || taskToChange.priority,
      status: status !== taskToChange.status ? status : taskToChange.status,
      title: title || taskToChange.title,
      description: description || taskToChange.description,
      dueDate: dueDate || taskToChange.dueDate,
      labels: labels || taskToChange.labels,
    };

    const filteredTasks = tasksInStore.filter((task) => task.taskId !== taskId);

    const updatedTasks = [...filteredTasks, updatedTask];

    setTaskState((prevTaskState) => ({
      prevTaskState,
      dueDate: [prevTaskState[updatedTask.dueDate], updatedTask],
    }));
    setTasks(updatedTasks);
    localStorage.setItem(TASKS, JSON.stringify(updatedTasks));

    showNotification({
      title: "Success",
      message: "Task updated.",
      icon: <BsCheckLg />,
      color: "teal",
    });

    return { message: "Task updated" };
  };

  const deleteTask = (task) => {
    const { taskId } = task;
    const tasksInStore = tasks || [];
    if (tasksInStore.find((task) => task.taskId === taskId)) {
      const updatedTasks = tasksInStore.filter(
        (task) => task.taskId !== taskId,
      );
      setTasks(updatedTasks);
      setTaskState((prevTaskState) => ({
        prevTaskState,
        dueDate: [
          prevTaskState[task.dueDate]?.filter(
            ({ taskId }) => taskId !== task.taskId,
          ),
        ],
      }));
      localStorage.setItem(TASKS, JSON.stringify(updatedTasks));

      showNotification({
        title: "Success",
        message: "Task deleted.",
        icon: <BsCheckLg />,
        color: "teal",
      });

      return { message: "Task Deleted" };
    } else {
      showNotification({
        title: "Something went wrong!",
        message: "Could not find the task.",
        icon: <ImCross />,
        color: "red",
      });

      return { message: "No task with that ID" };
    }
  };

  const createLabel = (title) => {
    const newId = uuidv4();
    const labelsInStore = JSON.parse(localStorage.getItem(LABELS)) || [];
    const updatedLabels = [...labelsInStore, { labelId: newId, title }];
    localStorage.setItem(LABELS, JSON.stringify(updatedLabels));

    showNotification({
      title: "Success",
      message: "Label created.",
      icon: <BsCheckLg />,
      color: "teal",
    });

    return { message: "Label created" };
  };

  return {
    taskState,
    getTasks,
    getLeftoverTasks,
    createTask,
    changeTask,
    deleteTask,
    createLabel,
  };
};
