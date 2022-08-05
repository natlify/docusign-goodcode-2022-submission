import React from "react";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const theme = useMantineTheme();
  const matches = useMediaQuery("(min-width: 860px)");

  return (
    <MantineCalendar
      value={selectedDate}
      onChange={setSelectedDate}
      size={matches ? "xl" : "md"}
      styles={(theme) => ({
        selected: {
          boxShadow: `inset 0px 0px 0px 2px ${theme.colors.primary[6]}`,
          background: `transparent !important`,
        },
        calendarHeaderLevel: {
          textTransform: "uppercase",
          color: theme.colors.primary[6],
          fontSize: 24,
        },
        monthPickerControlActive: {
          color: theme.colors.primary[6],
        },
        yearPickerControlActive: {
          color: theme.colors.primary[6],
        },
        day: {
          borderRadius: "50%",
          fontSize: 16,
        },
        weekday: { fontSize: 16, textTransform: "uppercase" },
      })}
      dayStyle={(date) => {
        const isTheSameDay = dayjs(new Date(date)).isSame(dayjs(), "day");
        if (isTheSameDay) {
          return {
            backgroundColor: theme.colors.primary[6],
            color: "#ffffff",
          };
        } else {
          return null;
        }
      }}
    />
  );
};

export default Calendar;
