import { Container, SimpleGrid, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBug, IconCross } from "@tabler/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import ImageCard from "../components/ImageCard";

const ImageGallery = () => {
  const [imageData, setImageData] = useState([1]);
  const items = imageData.map((item) => <ImageCard key={item} />);

  useEffect(() => {
    const getTasks = async () => {
      try {
        // setTasks(data);
        throw new Error("Sample Error Message");
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
  return <SimpleGrid cols={3}>{items}</SimpleGrid>;
};

export default ImageGallery;
