import React, { useEffect, useState } from "react";
import { useSearchBarStyles } from "../../hooks/styles/use-dashboard-styles";
import { Box, TextInput, useMantineTheme } from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import {
  useClickOutside,
  useDebouncedValue,
  useInputState,
} from "@mantine/hooks";
import SearchItems from "./SearchItems";

const DUMMY_TASKS = [
  {
    task_id: "1",
    title: "title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, fuga?",
    priority: 1,
    isDone: false,
    date: new Date("May 11, 2022"),
  },
  {
    task_id: "2",
    title: "title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, maxime.",
    priority: 2,
    isDone: false,
    date: new Date("May 10, 2022"),
  },
  {
    task_id: "3",
    title: "title 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, consequatur!",
    priority: 1,
    isDone: true,
    date: new Date("May 12, 2022"),
  },
  {
    task_id: "4",
    title: "title 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, doloremque!",
    priority: 3,
    isDone: true,
    date: new Date("May 13, 2022"),
  },
  {
    task_id: "5",
    title: "title 5",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, tenetur.",
    priority: 1,
    isDone: false,
    date: new Date("May 14, 2022"),
  },
  {
    task_id: "6",
    title: "title 6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, laudantium?",
    priority: 2,
    isDone: true,
    date: new Date("May 15, 2022"),
  },
  {
    task_id: "7",
    title: "title 7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, eligendi.",
    priority: 1,
    isDone: false,
    date: new Date("May 15, 2022"),
  },
  {
    task_id: "8",
    title: "title 8",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsum!",
    priority: 3,
    isDone: true,
    date: new Date("May 17, 2022"),
  },
];

const SearchBar = () => {
  const { classes } = useSearchBarStyles();
  const theme = useMantineTheme();

  const [name, setName] = useInputState("");
  const [debounced] = useDebouncedValue(name, 700);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    if (debounced === "") {
      setFilteredTasks([]);
      return;
    }

    const filteredTasks = DUMMY_TASKS.filter(
      (task) =>
        task.title.toLowerCase().includes(debounced.toLowerCase().trim()) ||
        task.description.toLowerCase().includes(debounced.toLowerCase().trim()),
    );
    setFilteredTasks(filteredTasks);
  }, [debounced]);

  return (
    <Box className={classes.searchBarWrapper}>
      <TextInput
        ref={ref}
        value={name}
        onChange={setName}
        variant="unstyled"
        placeholder="Look for a task"
        spellCheck={false}
        onFocus={() => setIsOpen(true)}
        className={classes.searchInput}
        styles={{
          root: {
            height: 43,
            marginRight: 20,
            borderBottom: `3px solid ${theme.colors.primary[6]}`,
            flexGrow: 2,

            [theme.fn.smallerThan("xl")]: {
              height: 50,
              marginRight: 15,
              borderBottom: `2px solid ${theme.colors.primary[6]}`,
            },

            [theme.fn.smallerThan("xs")]: {
              height: 46,
              marginRight: 10,
            },
          },
          input: {
            color: theme.colors.primary[6],
            width: "18vw",
            minWidth: 220,
            fontSize: 32,
            lineHeight: "60px",

            [theme.fn.smallerThan("xl")]: {
              fontSize: 32,
              height: 50,
              lineHeight: "40px",
            },

            [theme.fn.smallerThan("sm")]: {
              width: "25vw",
            },

            [theme.fn.smallerThan("xs")]: {
              minWidth: 200,
              fontSize: 26,
            },

            "&::placeholder": {
              color: theme.colors.primary[11],
            },
          },
        }}
      />

      <BsSearch size={32} className={classes.searchIcon} />
      <SearchItems
        tasks={filteredTasks}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  );
};

export default SearchBar;
