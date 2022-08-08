import _ from "lodash";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"; // import plugin

export const fromSnaketoTitle = (str) =>
  str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");

export const getUrlHashVars = (str) =>
  _.fromPairs(str.split("&").map((p) => p.split("=")));

/** DATE UTILS */

export const convertDateToRelativeString = (dt) => {
  dayjs.extend(relativeTime);
  return dayjs(dt).fromNow();
};

