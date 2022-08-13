import { createSelector } from "@rematch/select"
import axios from "axios"
import historyObject from "../routes/historyObject"
import { supabase } from "../utils/supabase"

export const user = {
  state: supabase.auth.user(),
  reducers: {
    setUser(state, payload) {
      return payload
    },
  },
  selectors: (slice, createSelector, hasProps) => ({
    isAuthed() {
      return slice((user) => (user?.email ? true : false))
    },
  }),
  effects: (dispatch) => ({
    async initAuth() {
      const sessionUser = supabase.auth.user()
      if (sessionUser) {
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

    async setServerCookie(payload, rootState) {
      axios.post("/api/auth/set-supabase-cookie", {
        event: rootState.user?.email ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      })
    },
  }),
}
