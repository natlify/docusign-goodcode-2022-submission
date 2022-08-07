import _ from "lodash";

export const fromSnaketoTitle = (str) =>
  str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");

export const getUrlHashVars = (str) =>
  _.fromPairs(str.split("&").map((p) => p.split("=")));
