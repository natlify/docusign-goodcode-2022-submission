import _ from "lodash";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime" 

export const fromSnaketoTitle = (str) =>
  str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");

export const getUrlHashVars = (str) =>
  _.fromPairs(str.split("&").map((p) => p.split("=")));

  export const getInitials = (name) => {
    const hasTokens = name.indexOf(" ") !== -1;
    return (
      name.substring(0, hasTokens ? 1 : 2) +
      (hasTokens ? name.charAt(name.lastIndexOf(" ") + 1) : "")
    );
  };

/** DATE UTILS */

export const convertDateToRelativeString = (dt) => {
  dayjs.extend(relativeTime);
  return dayjs(dt).fromNow();
};

