import React from "react";
import { Box, ScrollArea, Title } from "@mantine/core";

import { useCollectionsStyles } from "../../hooks/styles/use-dashboard-styles";
import CollectionCard from "./CollectionCard";

const DUMMY_COLLECTIONS = [
  {
    id: 1,
    title: "Personal",
    finished: 22,
    total: 50,
  },
  {
    id: 2,
    title: "Business",
    finished: 5,
    total: 15,
  },
  {
    id: 3,
    title: "Family",
    finished: 27,
    total: 30,
  },
  {
    id: 4,
    title: "Projects",
    finished: 13,
    total: 20,
  },
];

const Collections = () => {
  const { classes } = useCollectionsStyles();

  return (
    <Box className={classes.collectionsWrapper}>
      <Title order={5} className={classes.collectionsTitle}>
        COLLECTIONS
      </Title>
      <ScrollArea
        type="auto"
        scrollbarSize="7px"
        offsetScrollbars
        className={classes.scrollArea}
        styles={{
          scrollbar: {
            borderRadius: 12,
          },
          corner: {
            display: "none",
          },
        }}
      >
        <Box className={classes.collectionsContent}>
          {DUMMY_COLLECTIONS.map(({ id, title, finished, total }) => (
            <CollectionCard
              key={id}
              title={title}
              finished={finished}
              total={total}
            />
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default Collections;
