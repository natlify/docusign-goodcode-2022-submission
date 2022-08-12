export const settings = {
  state: {
    mediaValetDirectoryID: "7d256341-06e2-4f2b-8d29-0d4ffc1856f5",
    approver: {
      name: "Habit Meeter",
      email: "hbthck@gmail.com",
    },
  },
  reducers: {
    setValue(state, { key, value }) {
      return { ...state, [key]: value }
    },
  },
  effects: (dispatch) => ({}),
}
