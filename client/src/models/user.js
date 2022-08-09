const initialState = {
  username: null,
  fullName: "",
  email: "",
  role: "",
};

export const user = {
  state: {
    username: null,
  },
  reducers: {
    setUserData(state, payload) {
      return { ...state, payload };
    },
    resetData() {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    async login(payload, rootState) {},
  }),
};
