import { Button, Container, Group, SimpleGrid, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBug, IconCross } from "@tabler/icons";
import { useState } from "react";
import { useEffect } from "react";
import ImageCard from "../components/ImageCard";
import { useDispatch, useSelector, useStore } from "react-redux";

const ImageGallery = () => {
  const [imageData, setImageData] = useState(new Array(10).fill(0));
  const items = imageData.map((item) => <ImageCard key={item} />);
  const { dispatch, store } = useStore();
  const count = useSelector((root) => root.count);

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
  return (
    <Container>
      <div>
        <Text>{count}</Text>
        <Button onClick={async () => await dispatch.count.increment(1)}>
          Click Me
        </Button>
      </div>
      <SimpleGrid cols={3}>{items}</SimpleGrid>
    </Container>
  );
};

export default ImageGallery;
