import { getUrlHashVars } from "../utils/string";

export const arcGIS = {
  state: {
    access_token: null,
    username: null,
  },
  reducers: {
    setValue: (state, payload) => ({ ...payload }),
    setByKey: (state, { key, value }) => ({ ...state, [key]: value }),
    setUser: (state, payload) => ({ ...state, user: payload }),
    reset: () => ({
      access_token: null,
      username: null,
    }),
  },
  selectors: (slice) => ({
    isAuthenticated() {
      return slice((state) => state.username !== null)
    },
  }),
  effects: (dispatch) => ({
    triggerAuthFlow() {
      window.open(
        "https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=" +
          process.env.NEXT_PUBLIC_ARCGIS_CLIENT_ID +
          "&response_type=token&expiration=20160&redirect_uri=" +
          window.encodeURIComponent(
            process.env.NEXT_PUBLIC_ARCGIS_REDIRECT_URI,
          ),
        "oauth-window",
        "height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes",
      )
    },
    handleUserAuth(hashReturned) {
      const hashValuesAsString = hashReturned.substring(1)
      const authPayload = getUrlHashVars(hashValuesAsString)
      dispatch.arcGIS.setValue(authPayload)
    },
    disconnectAccount() {
      dispatch.arcGIS.reset()
    },
  }),
}
