const initialState = {
  username: null,
  fullName: "Arjith Natarajan",
  email: "hbthck@gmail.com",
  role: "Black Badge",
  acceptedClick: false,
};

export const user = {
  state: initialState,
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
