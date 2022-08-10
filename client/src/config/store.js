import { init } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import selectPlugin from "@rematch/select";
import storage from "redux-persist/lib/storage";
import loadingPlugin from "@rematch/loading";
import models from "../models";

const persistConfig = {
  key: "neverGonnaGiveYouUp!",
  storage,
  whitelist: ["count", "user", "contacts"],
};
const store = init({
  models,
  plugins: [loadingPlugin(), selectPlugin(), persistPlugin(persistConfig)],
});

init();

export default store;
