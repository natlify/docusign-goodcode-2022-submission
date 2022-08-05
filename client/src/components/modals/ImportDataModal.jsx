import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Text,
  Group,
  RingProgress,
  Center,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import { useModalStyles } from "../../hooks/styles/use-modals-styles";
import { useUserStore } from "../../hooks/store/use-user-store";
import { useGuestStore } from "../../hooks/store/use-guest-store";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const ImportDataModal = ({ opened, setOpened }) => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const theme = useMantineTheme();
  const { getTasks } = useGuestStore();
  const { createTaskAsync } = useUserStore();
  const { setUser } = useContext(UserContext);
  let callback = useRef();
  const { classes } = useModalStyles();
  const navigate = useNavigate();

  useEffect(() => {
    let interval, closeModal, resetImporting;
    if (progress < 100 && importing) {
      callback.current = () => {
        setProgress(progress + 7);
      };
      interval = setInterval(() => callback.current(), 150);
      return () => clearInterval(interval);
    }
    if (progress >= 100) {
      closeModal = setTimeout(() => {
        setOpened(false);
      }, 1500);
      resetImporting = setTimeout(() => {
        setProgress(0);
        setImporting(false);
      }, 2000);
      return () => {
        clearTimeout(closeModal);
        clearTimeout(resetImporting);
      };
    }
    return () => {
      clearTimeout(closeModal);
      clearTimeout(resetImporting);
      clearInterval(interval);
    };
  }, [progress, importing]);

  const handleImportClick = async () => {
    setImporting(true);
    const tasks = getTasks();

    try {
      localStorage.removeItem("tasks");
      for (const task of tasks) {
        const { title, description, priority, status, dueDate } = task;
        await createTaskAsync({
          title,
          description,
          priority,
          status,
          dueDate,
        });
      }
      setUser();
      navigate(0);
    } catch (error) {
      setError(error);
      showNotification({
        title: "Something went wrong!",
        message: error.message,
        icon: <ImCross />,
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside={false}
      closeOnEscape={false}
      centered
      withCloseButton={false}
      title={
        importing
          ? progress >= 99
            ? error
              ? "Error"
              : "Completed!"
            : "Importing your data..."
          : "Hold it right there!"
      }
      padding={40}
      styles={(theme) => ({
        title: {
          fontSize: 26,
          color: theme.white,
          fontWeight: 700,
          letterSpacing: "1px",
          width: "100%",
          textAlign: "center",
        },
      })}
    >
      {importing ? (
        <RingProgress
          sx={{ margin: "0 auto" }}
          sections={[
            {
              value: progress,
              color:
                progress >= 99
                  ? error
                    ? "red"
                    : "teal"
                  : theme.colors.primary[6],
            },
          ]}
          label={
            progress >= 99 ? (
              error ? (
                <Center>
                  <ThemeIcon color="red" variant="light" radius="xl" size="xl">
                    <ImCross size={22} />
                  </ThemeIcon>
                </Center>
              ) : (
                <Center>
                  <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                    <BsCheckLg size={22} />
                  </ThemeIcon>
                </Center>
              )
            ) : (
              <Text
                color={theme.colors.primary[6]}
                weight={700}
                align="center"
                size="xl"
              >
                {progress.toFixed(0)}%
              </Text>
            )
          }
        />
      ) : (
        <>
          <Text size="lg" align="center">
            We&apos;ve detected that you were using Timey before signing up. Do
            you want to import your data to your account?
          </Text>
          <Group spacing={60} position="center" mt={30}>
            <Button
              color="red"
              variant="outline"
              onClick={() => setOpened(false)}
            >
              No, I don&apos;t
            </Button>
            <Button className={classes.button} onClick={handleImportClick}>
              Yeah, sure!
            </Button>
          </Group>
        </>
      )}
    </Modal>
  );
};

export default ImportDataModal;
