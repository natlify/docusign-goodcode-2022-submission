import React from "react";
import {
  Box,
  Card,
  Progress,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { useCollectionsStyles } from "../../hooks/styles/use-dashboard-styles";

const CollectionCard = ({ title, finished, total }) => {
  const { classes } = useCollectionsStyles();
  const isSmaller = useMediaQuery("(max-width: 1400px)");
  const theme = useMantineTheme();

  const percentage = React.useMemo(
    () => Math.trunc((finished / total) * 100),
    [finished, total],
  );

  return (
    <Card
      className={classes.collectionCard}
      style={isSmaller ? { padding: "18px 22px" } : { padding: "27px 36px" }}
    >
      <Box>
        <Text className={classes.taskNumber} color={theme.colors.primary[6]}>
          {total} tasks
        </Text>
        <Title order={5}>{title}</Title>
      </Box>
      <Progress
        value={percentage}
        size={isSmaller ? "md" : "lg"}
        radius="lg"
        color={theme.colors.primary[6]}
        styles={{
          root: {
            backgroundColor: theme.white,
          },
        }}
      />
    </Card>
  );
};

export default CollectionCard;
