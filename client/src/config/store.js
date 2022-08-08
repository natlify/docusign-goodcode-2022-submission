import { init } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import selectPlugin from "@rematch/select";
import storage from "redux-persist/lib/storage";
import models from "../models";

const persistConfig = {
  key: "neverGonnaGiveYouUp!",
  storage,
  whitelist: ["count"],
};
const store = init({
  models,
  plugins: [selectPlugin(), persistPlugin(persistConfig)],
});

init();

export default store;
