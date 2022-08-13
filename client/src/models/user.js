import historyObject from "../routes/historyObject"
import { supabase } from "../utils/supabase"

const initialState = {
  userDetails: null,
  username: null,
  fullName: "Arjith Natarajan",
  email: "hbthck@gmail.com",
  role: "Black Badge",
  acceptedClick: false,
}

export const user = {
  state: initialState,
  reducers: {
    setUser(state, payload) {
      return { ...state, userDetails: payload }
    },
    setUserData(state, payload) {
      return { ...state, payload }
    },
    resetData() {
      return initialState
    },
  },
  effects: (dispatch) => ({
    async initAuth() {
      const sessionUser = supabase.auth.user()
      if (sessionUser) {
        console.log("Initializing Auth")
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single()

        dispatch.user.setUser({ ...sessionUser, ...profile })
      }
    },
    async login(payload, rootState) {},
    async logout() {
      await supabase.auth.signOut()
      dispatch.user.setUser(null)
      historyObject.replace("/")
    },
  }),
}
