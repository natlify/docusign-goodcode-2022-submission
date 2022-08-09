import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBug, IconCross } from "@tabler/icons";
import { useState, useEffect } from "react";
import ImageCard from "../components/ImageCard";
import { useDispatch, useSelector, useStore } from "react-redux";
import Loading from "../components/Loading";
import { openConfirmModal } from "@mantine/modals";

const ImageGallery = () => {
  const imageData = useSelector((root) => root.ctImages.list);
  const isLoading = useSelector(
    (root) => root.loading.effects.ctImages.fetchDataFromSources,
  );
  const handleVerifyFlow = async (imageData) => {
    const redirectURL = await dispatch.ctImages.triggerDocuSignDocumentFlow({
      imageData,
    });
  };

  const openModal = (imageData) =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  const items = imageData.map((item, index) => (
    <ImageCard
      key={item.id}
      data={item}
      index={index}
      onSensitiveClick={openModal}
      onTriggerClick={handleVerifyFlow}
    />
  ));
  const visible = useSelector(
    (root) => root.loading.effects.ctImages.triggerDocuSignDocumentFlow,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasks = async () => {
      try {
        // setTasks(data);
        await dispatch.ctImages.fetchDataFromSources({
          folderId: "7d256341-06e2-4f2b-8d29-0d4ffc1856f5",
        });
        // throw new Error("Sample Error Message");
      } catch (error) {
        showNotification({
          title: "Something went wrong!",
          message: "Failed to fetch tasks",
          icon: <IconBug size={15} />,
          color: "red",
        });
      }
    };
    getTasks();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Container>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <SimpleGrid spacing={50} cols={3}>
          {items}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ImageGallery;
