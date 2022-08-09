import { supabase } from "../utils/supabase";
import _ from "lodash";
const initialState = {
  list: [],
};

export const contacts = {
  state: initialState, // initial state
  reducers: {
    setList(state, payload) {
      return { ...state, list: payload };
    },
    addToList(state, payload) {
      return { ...state, list: [...state.list, payload] };
    },
  },
  effects: (dispatch) => ({
    async fetchData() {
      const { data } = await supabase.from("contacts").select("*");
      dispatch.contacts.setList(data);
    },
  }),
};
